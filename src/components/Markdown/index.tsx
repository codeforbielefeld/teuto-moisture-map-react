import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import raw from "raw.macro";

const Markdown = ({ file }: { file: string }) => (
    <ReactMarkdown
        children={raw(`../../resources/markdown/${file}`)}
        remarkPlugins={[remarkGfm]}
    />
);

export default Markdown;
