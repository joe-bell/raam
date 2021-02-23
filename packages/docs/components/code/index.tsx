import * as React from "react";
import dynamic from "next/dynamic";

const CodeDynamic = dynamic(() => import("./code"));

export const Code = (props) => <CodeDynamic {...props} />;
