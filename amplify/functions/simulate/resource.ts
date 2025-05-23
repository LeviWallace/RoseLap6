import { execSync } from "node:child_process";
import * as path from "node:path";
import { fileURLToPath } from "node:url";
import { defineFunction } from "@aws-amplify/backend";
import { DockerImage, Duration } from "aws-cdk-lib";
import { Code, Function, Runtime } from "aws-cdk-lib/aws-lambda";

const functionDir = path.dirname(fileURLToPath(import.meta.url));

// export const simulateFunctionHandler = defineFunction({
// 	name: "simulate",
// 	entry: "./path/to/your/function", // Points to a folder with index.py + requirements.txt
// 	timeoutSeconds: 60, // default is 3 seconds
// 	memoryMB: 256, // default is 128 MB
// 	environment: {
// 		"ENV": "dev"
// 	},
// });

export const simulateFunctionHandler = defineFunction(
	(scope) =>
		new Function(scope, "simulate", {
			handler: "index.handler",
			runtime: Runtime.PYTHON_3_10, // or any other python version
			timeout: Duration.seconds(60), //  default is 3 seconds
			memorySize: 256, // default is 128 MB
			code: Code.fromAsset(functionDir, {
				bundling: {
					image: DockerImage.fromRegistry("dummy"), // replace with desired image from AWS ECR Public Gallery
					local: {
						tryBundle(outputDir: string) {
							execSync(
								`python3 -m pip install -r ${path.join(functionDir, "requirements.txt")} -t ${path.join(outputDir)} --platform manylinux2014_x86_64 --only-binary=:all:`
							);
							execSync(`cp ${path.join(functionDir, "index.py")} ${outputDir}`);
							return true;
						},
					},
				},
			}),
		}),
		{
			resourceGroupName: "auth",
		},
);
