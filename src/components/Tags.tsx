import React from "react";
import { Badge } from "react-bootstrap";

interface Tags {
  tags: string[];
}
function Tags(props: Tags) {
  const { tags } = props;
  return (
    <>
      {tags.map((t) => (
        <Badge key={t} variant="info">
          {t}
        </Badge>
      ))}
    </>
  );
}

export default Tags;
