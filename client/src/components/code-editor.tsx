import { useState, useEffect } from "react";
import type { CodeViewerProps } from "../../types/githubViewTypes";
import { Button } from "@/components/ui/button";
import { Copy, Check, Save, Code2 } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Prism from "prismjs";
import { highlight, languages } from "prismjs";
import "prismjs/components/prism-java";
import "prismjs/components/prism-javascript";
import "prismjs/components/prism-python";
import "prismjs/themes/prism.css";  
import Editor from "react-simple-code-editor";
import { dracula } from "react-syntax-highlighter/dist/esm/styles/prism"; 

function CodeEditorView({ editedCode, setEditedCode, isEditor }: { editedCode: string; isEditor: boolean; setEditedCode: React.Dispatch<React.SetStateAction<string>> }) {
  return (
    <div className="overflow-x-auto">
      <div className="min-w-full flex">
        <div className="bg-muted/10 dark:bg-gray-900 py-4 flex flex-col items-end px-4">
          {editedCode.split("\n").map((_, i) => (
            <span key={i} className="text-gray-400 dark:text-gray-500">
              {i + 1}
            </span>
          ))}
        </div>

        <div className="w-full overflow-x-auto">
          <Editor
            value={editedCode}
            highlight={(code) => highlight(code, languages.javascript, "javascript")}
            onValueChange={setEditedCode}
            padding={10}
            className="font-mono text-sm bg-transparent focus:outline-none leading-6"
            style={{
              backgroundColor: "transparent",
              minHeight: "300px",
              tabSize: 2,
              resize: "none",
              lineHeight: "1.5rem",
              color: "inherit",
              pointerEvents: isEditor ? "auto" : "none",
              userSelect: isEditor ? "auto" : "none",
              cursor: isEditor ? "text" : "default",
            }}
          />
        </div>
      </div>
    </div>
  );
}

export function CodeEditor({ code: initialCode, fileName }: CodeViewerProps) {
  const [code, setCode] = useState(initialCode);
  const [editedCode, setEditedCode] = useState(initialCode);
  const [isCopied, setIsCopied] = useState(false);
  const [activeTab, setActiveTab] = useState<"preview" | "edit">("preview");

  useEffect(() => {
    setCode(initialCode);
    setEditedCode(initialCode);
  }, [initialCode]);

  const copyToClipboard = async () => {
    await navigator.clipboard.writeText(activeTab === "edit" ? editedCode : code);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  const handleSave = () => {
    setCode(editedCode);
    setActiveTab("preview");
  };

  return (
    <div className="rounded-xl border bg-background/50 dark:bg-gray-900 shadow-lg overflow-hidden">
      <div className="flex items-center justify-between border-b bg-muted/30 dark:bg-gray-800 px-4 py-3">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2 bg-background/50 dark:bg-gray-700 px-3 py-1 rounded-md">
            <Code2 className="h-4 w-4 dark:text-primary" />
            <span className="text-sm font-medium text-gray-900 dark:text-white">{fileName}</span>
          </div>
        </div>
        <Button variant="ghost" size="sm" onClick={copyToClipboard} className="hover:bg-background/50 dark:hover:bg-gray-700">
          {isCopied ? <Check className="h-4 w-4 mr-2" /> : <Copy className="h-4 w-4 mr-2" />}
          {isCopied ? "Copied" : "Copy"}
        </Button>
      </div>

      <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as "preview" | "edit")}>
        <div className="border-b bg-muted/20 dark:bg-gray-800">
          <div className="flex items-center justify-between px-4">
            <TabsList className="bg-transparent border-b-0 h-11">
              <TabsTrigger value="preview" className="data-[state=active]:bg-background/50 dark:text-white">
                Preview
              </TabsTrigger>
              <TabsTrigger value="edit" className="data-[state=active]:bg-background/50 dark:text-white">
                Edit
              </TabsTrigger>
            </TabsList>
            {activeTab === "edit" && (
              <Button size="sm" onClick={handleSave} className="bg-black dark:bg-primary/90 hover:bg-black dark:bg-primary dark:bg-green-600 dark:hover:bg-green-700">
                <Save className="h-4 w-4 mr-2" />
                Save Changes
              </Button>
            )}
          </div>
        </div>

        <div className="relative">
          <TabsContent value="preview" className="mt-0">
            <CodeEditorView editedCode={code} setEditedCode={setEditedCode} isEditor={false} />
          </TabsContent>
          <TabsContent value="edit" className="mt-0">
            <CodeEditorView editedCode={editedCode} setEditedCode={setEditedCode} isEditor={true} />
          </TabsContent>
        </div>
      </Tabs>
    </div>
  );
}
