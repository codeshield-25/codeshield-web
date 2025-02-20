import { useState, useEffect } from "react";
import type { CodeViewerProps } from "../../types/githubViewTypes";
import { Button } from "@/components/ui/button";
import { Copy, Check, ChevronLeft, ChevronRight, Save, Code2 } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Prism from "prismjs";
import { highlight, languages } from "prismjs";
import "prismjs/components/prism-java";
import "prismjs/components/prism-javascript";
import "prismjs/components/prism-python";
import "prismjs/themes/prism.css";
import Editor from "react-simple-code-editor";

type TabValue = "preview" | "edit";

function CodeEditorView({ editedCode, setEditedCode, isEditor }: { editedCode: string; isEditor:boolean; setEditedCode: React.Dispatch<React.SetStateAction<string>> }) {
  return (
    <div className="overflow-x-auto">
      <div className="min-w-full flex">
        {/* Line Numbers */}
        <div
          className="bg-muted/10 py-4 flex flex-col items-end"
          style={{
            fontFamily: "monospace",
            fontSize: "14px",
            lineHeight: "1.5rem", // Matches editor line height
            paddingTop: "10px", // Matches editor padding
            paddingBottom: "10px",
            paddingRight: "8px", // Extra spacing for line numbers
            paddingLeft: "8px", // Extra spacing for line numbers
          }}
        >
          {editedCode.split("\n").map((_, i) => (
            <span
              key={i}
              className="text-gray-400"
              style={{
                height: "1.5rem", // Matches line height precisely
                display: "block", // Ensures proper spacing
              }}
            >
              {i + 1}
            </span>
          ))}
        </div>



        {/* Editable or readable Code Area */}
        {isEditor ? (
          <div className="w-full overflow-x-auto">
          <Editor
            value={editedCode}
            highlight={(code) => highlight(code, languages.javascript, "javascript")}
            onValueChange={(newCode) => setEditedCode(newCode)} // Use the provided `newCode` directly
            padding={10}
            className="font-mono text-sm bg-transparent focus:outline-none leading-6"
            style={{
              backgroundColor: "#f5f5f5",
              minHeight: "300px",
              tabSize: 2,
              resize: "none",
              lineHeight: "1.5rem", // Matches line numbers line height
            }}
          />
        </div>
        ) : (
          <div className="w-full overflow-x-auto">
          <Editor
            value={editedCode}
            highlight={(code) => highlight(code, languages.javascript, "javascript")}
            onValueChange={(newCode) => setEditedCode(newCode)} // Use the provided `newCode` directly
            padding={10}
            className="font-mono text-sm bg-transparent focus:outline-none leading-6"
            style={{
              backgroundColor: "#f5f5f5",
              minHeight: "300px",
              tabSize: 2,
              resize: "none",
              lineHeight: "1.5rem", // Matches line numbers line height
              pointerEvents: "none", // Disable all user interactions
              userSelect: "none",   // Disable text selection
              cursor: "default",    // Remove the cursor
            }}
          />
          </div>
        )}
      </div>
    </div>
  );
}

export function CodeEditor({ code: initialCode, fileName }: CodeViewerProps) {
  const [code, setCode] = useState(initialCode);
  const [editedCode, setEditedCode] = useState(initialCode);
  const [isCopied, setIsCopied] = useState(false);
  const [currentExample, setCurrentExample] = useState(1);
  const [activeTab, setActiveTab] = useState<TabValue>("preview");
  const totalExamples = 1;

  useEffect(() => {
    setCode(initialCode);
    setEditedCode(initialCode);
  }, [initialCode]);

  const updateHighlighting = () => {
    requestAnimationFrame(() => Prism.highlightAll());
  };

  useEffect(() => {
    updateHighlighting();
  }, [code, activeTab]);

  const copyToClipboard = async () => {
    await navigator.clipboard.writeText(activeTab === "edit" ? editedCode : code);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  const handleSave = () => {
    setCode(editedCode);
    setActiveTab("preview");
  };

  const handleTabChange = (value: string) => {
    setActiveTab(value as TabValue);
    updateHighlighting();
  };


  return (
    <div className="rounded-xl border bg-background/50 shadow-lg overflow-hidden backdrop-blur-sm">
      <div className="flex items-center justify-between border-b bg-muted/30 px-4 py-3">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2 bg-background/50 px-3 py-1 rounded-md">
            <Code2 className="h-4 w-4 text-primary" />
            <span className="text-sm font-medium">{fileName}</span>
          </div>
          <div className="flex items-center space-x-2">
            <Button
              variant="ghost"
              size="sm"
              disabled={currentExample === 1}
              onClick={() => setCurrentExample((prev) => prev - 1)}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <span className="text-sm">
              Example {currentExample}/{totalExamples}
            </span>
            <Button
              variant="ghost"
              size="sm"
              disabled={currentExample === totalExamples}
              onClick={() => setCurrentExample((prev) => prev + 1)}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={copyToClipboard}
          className="hover:bg-background/50"
        >
          {isCopied ? (
            <>
              <Check className="h-4 w-4 mr-2" /> Copied
            </>
          ) : (
            <>
              <Copy className="h-4 w-4 mr-2" /> Copy
            </>
          )}
        </Button>
      </div>

      <Tabs value={activeTab} onValueChange={(value) => handleTabChange(value)}>
        <div className="border-b bg-muted/20">
          <div className="flex items-center justify-between px-4">
            <TabsList className="bg-transparent border-b-0 h-11">
              <TabsTrigger
                value="preview"
                className="data-[state=active]:bg-background/50"
              >
                Preview
              </TabsTrigger>
              <TabsTrigger
                value="edit"
                className="data-[state=active]:bg-background/50"
              >
                Edit
              </TabsTrigger>
            </TabsList>
            {activeTab === "edit" && (
              <Button
                size="sm"
                onClick={handleSave}
                className="bg-primary/90 hover:bg-primary"
              >
                <Save className="h-4 w-4 mr-2" />
                Save Changes
              </Button>
            )}
          </div>
        </div>

        <div className="relative">
          <TabsContent value="preview" className="mt-0">
           <CodeEditorView editedCode={code} setEditedCode={setEditedCode} isEditor={false}/>
          </TabsContent>

          <TabsContent value="edit" className="mt-0">
            <CodeEditorView editedCode={editedCode} setEditedCode={setEditedCode} isEditor={true}/>
          </TabsContent>
        </div>
      </Tabs>
    </div>
  );
}