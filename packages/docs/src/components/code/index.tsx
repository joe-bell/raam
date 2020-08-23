import * as React from "react";
import dynamic from "next/dynamic";

const CodeDynamic = dynamic(() => import("./code"));

export default (props) => <CodeDynamic {...props} />;
