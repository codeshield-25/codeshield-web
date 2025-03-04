const express = require('express');
const { exec } = require('child_process');
const fs = require('fs');
const path = require('path');
const together = require('together-ai')
const dotenv = require('dotenv');
const cors = require('cors');

const app = express();

app.use(cors({ 
    origin: '*', // Allow requests from React
    credentials: true 
  }));

  
// Middleware to parse JSON request bodies and plain text
app.use(express.json());
app.use(express.text({ type: 'text/plain' }));
dotenv.config();

// Tokens
const SNYK_TOKEN = process.env.SNYK_TOKEN;
const TOGETHER_TOKEN = process.env.TOGETHER_API_KEY;

const client = new together({
    apiKey: TOGETHER_TOKEN
});

// Endpoint to scan a GitHub repository
app.post('/scan', (req, res) => {
    const { repoUrl,scanType } = req.body;
    console.log('Received request to scan repository:', repoUrl);

    if (!repoUrl || !repoUrl.startsWith('https://github.com/')) {
        return res.status(400).json({ error: 'Invalid or missing GitHub repository URL.' });
    }
    const scanCommands = {
        open_source: 'snyk test',               // Open source security
        code_security: 'snyk code test',       // Code security
        configuration: 'snyk iac test',        // Configuration issues
        code_quality: 'snyk code test --severity-threshold=low', // Code quality (low severity included)
    };

    if (!scanCommands[scanType]) {
        return res.status(400).json({ error: 'Invalid or missing scan type. Supported types: open_source, code_security, configuration, code_quality.' });
    }
    // Extract the repository name from the URL
    const repoName = repoUrl.split('/').pop().replace(/\.git$/, ''); // Get only the repository name
    const repoPath = path.join(__dirname, 'repos', repoName); // Construct the correct path

    console.log(repoPath);

    const cloneRepository = () => {
        return new Promise((resolve, reject) => {
            if (fs.existsSync(repoPath)) {
                console.log(`Repository ${repoName} already exists. Pulling latest changes...`);
                exec(`git -C ${repoPath} pull`, (error, stdout, stderr) => {
                    if (error) return reject(new Error(stderr || error.message));
                    resolve(stdout);
                });
            } else {
                console.log(`Cloning repository: ${repoUrl}`);
                console.log(`Cloning repository: ${repoPath}`);
                exec(`git clone ${repoUrl} ${repoPath}`, (error, stdout, stderr) => {
                    if (error) return reject(new Error(stderr || error.message));
                    resolve(stdout);
                });
            }
        });
    };

    const runSnykScan = () => {
        return new Promise((resolve, reject) => {
            const snykCommand = `${scanCommands[scanType]} --json ${repoPath}`;
            console.log(`Executing: ${snykCommand}`);
            
            exec(
                snykCommand,
                {
                    env: {
                        ...process.env, // Include existing environment variables
                        SNYK_TOKEN, // Explicitly pass the Snyk token
                    },
                    timeout: 300000, // Optional: Increase timeout to 5 minutes
                },
                (error, stdout, stderr) => {
                    console.log('STDOUT:', stdout); // Logs the JSON response
                    console.error('STDERR:', stderr); // Logs warnings/errors, if any
                    
                    // Handle Snyk CLI output
                    if (stdout) {
                        try {
                            // Parse and return the JSON response from STDOUT
                            // const snykResults = JSON.parse(stdout);
                            const snykResults = JSON.parse(stdout.trim());
                            resolve(snykResults);
                        } catch (parseError) {
                            console.error('Error parsing Snyk output:', parseError.message);
                            reject(new Error('Failed to parse JSON from Snyk CLI.'));
                        }
                    } else {
                        // Handle case when no valid JSON is returned
                        reject(new Error(stderr || 'Unknown error occurred while running Snyk scan.'));
                    }
                }
            );
        });
    };
    

    // Main logic
    cloneRepository()
        .then(() => runSnykScan())
        .then((snykResults) => {
            // Send parsed JSON response
            res.json(snykResults);
        })
        // .then((snykOutput) => {
        //     const snykResults = JSON.parse(snykOutput);
        //     res.json(snykResults);
        // })
        .catch((error) => {
            console.error('Error during scan:', error.message);
            res.status(500).json({ error: 'Failed to scan repository.', details: error.message });
        })
        .finally(() => {
            if (fs.existsSync(repoPath)) {
                fs.rmSync(repoPath, { recursive: true, force: true });
                console.log(`Cleaned up cloned repository: ${repoPath}`);
            }
        });
});

async function main(prompt) {
    const stream = await client.chat.completions.create({
        // model: 'deepseek-ai/DeepSeek-R1-Distill-Llama-70B-free',
        model: 'meta-llama/Llama-3.3-70B-Instruct-Turbo-Free',
        messages: [{ role: 'user', content: prompt }],
        // stream: true,
    });
    // for await (const chunk of stream) {
    //     process.stdout.write(chunk.choices[0]?.delta?.content || '');
    // }
    // console.log(stream.choices[0].message.content);
    return stream.choices[0].message.content;
}

//AI rewrite 
app.post('/ai',async (req,res) => {

    const message = req.body;
    const data = await main(message);

    res.send(data);

})

//Natural Language query
app.post('/query',async(req,res)=>{
    const query = req.body;
    const data=await main(query);

    res.send(data);
}
)

app.get('/', (req, res) => {
    res.send('Server is running');
});

// Start the server
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Snyk scan server running on http://localhost:${PORT}`);
});