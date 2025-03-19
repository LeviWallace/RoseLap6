import { Button } from "@heroui/button"
import DefaultLayout from "@/layouts/default";
import outputs from "../../../amplify_outputs.json"
import { Amplify } from "aws-amplify"
import { generateClient } from "aws-amplify/api"
import { Schema } from "../../../amplify/data/resource";

Amplify.configure(outputs)

const client = generateClient<Schema>()

export default function SweepsPage(){
	
	async function handleClick() {
		console.log(client);
		const status = client.queries.sayHello({
			name: "Amplify"
		});
		console.log(status);
		console.log("Hello from Amplify!")
	}

	return (
		<DefaultLayout>
			<Button onPress={handleClick} />
		</DefaultLayout>
	);
}
