import { Button } from "react-bootstrap";
import ReactHtmlParser, {
    processNodes,
    convertNodeToElement,
  } from "react-html-parser";

function transform(node, index) {
    if (node.type === "tag" && node.name === "span") {
      return null;
    }
    if (node.type === "tag" && node.name === "ul") {
      node.name = "ol";
      return convertNodeToElement(node, index, transform);
    }
  
    if (node.type === "tag" && node.name === "b") {
      return <i key={index}>{processNodes(node.children, transform)}</i>;
    }
    if (node.type === "tag" && node.name === "a") {
      node.attribs.target = "_blank";
  
      return convertNodeToElement(node, index, transform);
    }
  
    if (node.type === "tag" && node.name === "button") {
      return (
        <Button variant="contained" color="primary" key={index}>
          {processNodes(node.children, transform)}
        </Button>
      );
    }
  }
  
  export const HtmlParseOptions = {
    decodeEntities: true,
    transform,
  };
