import { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

const Markdown = ({ file }: { file: string }) => {
    const [content, setContent] = useState("");

    useEffect(() => {
        const fetchMarkdown = async () => {
            try {
                const response = await fetch(`../../markdown/${file}`);
                const markdownContent = await response.text();
                setContent(markdownContent);
            } catch (error) {
                console.error("Error fetching Markdown:", error);
            }
        };

        fetchMarkdown();
    }, [file]);

    return <ReactMarkdown children={content} remarkPlugins={[remarkGfm]} />;
};

export default Markdown;
