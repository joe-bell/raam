import * as React from "react";
import dynamic from "next/dynamic";

const CodeDynamic = dynamic(() => import("./code"));

const Code = (props) => <CodeDynamic {...props} />;
export default Code;
