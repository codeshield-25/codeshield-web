import React, { useEffect, useState } from "react";
import axios from "axios";
interface GitDataProps {
  initialRepoUrl: string;
}
const CodeBrowser: React.FC<GitDataProps> = ({ initialRepoUrl }) => {
    
  const [repoUrl, setRepoUrl] = useState(initialRepoUrl);
  const [repoData, setRepoData] = useState<any[]>([]);
  const [expandedFolders, setExpandedFolders] = useState<Record<string, boolean>>({});
  const [fileContent, setFileContent] = useState<string | null>(null);
  const [currentFilePath, setCurrentFilePath] = useState<string>("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    console.log("initialRepoUrl", repoUrl);
    if (repoUrl) {
      fetchRepo();
    }
  },[repoUrl]);

  const fetchRepo = async (path: string = "") => {
    setError("");
    setLoading(true);

    try {
      const apiUrl = `https://api.github.com/repos/${getOwnerAndRepo(repoUrl)}/contents/${path}`;
      const response = await axios.get(apiUrl);
      console.log("response", response);

      if (response.status === 200) {
        const sortedData = sortContents(response.data);
        setRepoData((prevData) => {
          const newData = [...prevData];
          replaceTree(newData, path, sortedData); // Updated function
          return [...newData];
        });
      } else {
        setError("Could not fetch the repository contents. Please check the URL.");
      }
    } catch (err) {
      setError("Failed to fetch repository. Make sure the URL is correct.");
    } finally {
      setLoading(false);
    }
  };

  const fetchFileContent = async (fileUrl: string, filePath: string) => {
    setLoading(true);
    setError("");
    setFileContent(null);

    try {
      const response = await axios.get(fileUrl);

      if (response.status === 200) {
        setFileContent(response.data);
        setCurrentFilePath(filePath);
      } else {
        setError("Failed to fetch file content.");
      }
    } catch (err) {
      setError("Failed to fetch file content.");
    } finally {
      setLoading(false);
    }
  };

  const getOwnerAndRepo = (url: string) => {
    const match = url.match(/github\.com\/(.+?)\/(.+?)(?:\.git|$)/);
    if (match && match[1] && match[2]) {
      return `${match[1]}/${match[2]}`;
    }
    return "";
  };

  const sortContents = (contents: any[]) => {
    const folders = contents.filter((item) => item.type === "dir");
    const files = contents.filter((item) => item.type === "file");
    return [...folders, ...files];
  };

  const toggleFolder = (path: string) => {
    setExpandedFolders((prev) => ({
      ...prev,
      [path]: !prev[path],
    }));
  };

  // Updated: Replace folder contents instead of appending
  const replaceTree = (tree: any[], path: string, contents: any[]) => {
    if (path === "") {
      // Root folder
      tree.length = 0; // Clear root folder
      contents.forEach((item) => tree.push({ ...item, children: [] }));
    } else {
      const segments = path.split("/");
      let currentNode = tree;

      for (const segment of segments) {
        const foundNode = currentNode.find((node) => node.name === segment);
        if (foundNode) {
          currentNode = foundNode.children || [];
        }
      }

      // Replace children for the specific folder
      currentNode.length = 0; // Clear existing children
      contents.forEach((item) => currentNode.push({ ...item, children: [] }));
    }
  };

  const renderTree = (tree: any[], parentPath = "") => {
    return (
      <ul className="pl-4">
        {tree.map((item) => {
          const itemPath = parentPath ? `${parentPath}/${item.name}` : item.name;

          if (item.type === "dir") {
            return (
              <li key={item.sha}>
                <button
                  onClick={() => {
                    toggleFolder(itemPath);
                    if (!expandedFolders[itemPath]) fetchRepo(itemPath);
                  }}
                  className="text-yellow-500 hover:underline"
                >
                  📁 {item.name}
                </button>
                {expandedFolders[itemPath] && renderTree(item.children || [], itemPath)}
              </li>
            );
          } else {
            return (
              <li key={item.sha}>
                <button
                  onClick={() => fetchFileContent(item.download_url, itemPath)}
                  className="text-blue-500 hover:underline"
                >
                  📄 {item.name}
                </button>
              </li>
            );
          }
        })}
      </ul>
    );
  };

  const renderBreadcrumbs = () => {
    const segments = currentFilePath.split("/");

    return (
      <nav className="mb-4 text-sm">
        {segments.map((segment, index) => (
          <span key={index}>
            {index > 0 && " / "}
            <span className="text-gray-700">{segment}</span>
          </span>
        ))}
      </nav>
    );
  };

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <div className="w-1/4 bg-gray-50 p-4 border-r overflow-y-auto">
        <h3 className="font-bold mb-4">Navigation</h3>
        {repoData.length > 0 ? (
          renderTree(repoData)
        ) : (
          <div className="text-gray-500">No data to display</div>
        )}
      </div>

      {/* Main Content */}
      <div className="w-3/4 flex flex-col p-4">
        {/* Top Bar */}
        <div className="mb-4">
          <input
            type="text"
            // placeholder={repoUrl}
            value={repoUrl}
            onChange={(e) => setRepoUrl(e.target.value)}
            className="border p-2 w-full mb-2"
          />
          <button
            onClick={() => fetchRepo()}
            disabled={loading || !repoUrl}
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            {loading ? "Loading..." : "View Repository"}
          </button>
        </div>

        {/* Breadcrumbs */}
        {currentFilePath && renderBreadcrumbs()}

        {/* Code Viewer */}
        <div className="flex-grow bg-gray-100 p-4 rounded shadow overflow-auto">
          {fileContent ? (
            <pre className="whitespace-pre-wrap">
              <code>{fileContent}</code>
            </pre>
          ) : (
            <div className="text-gray-500">Select a file to view its contents.</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CodeBrowser;
