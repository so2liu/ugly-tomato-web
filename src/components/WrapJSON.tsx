import React from "react";

export default (props: { json: object }) => (
  <pre style={{ overflow: "hidden" }}>
    {JSON.stringify(props.json, null, 2)}
  </pre>
);
