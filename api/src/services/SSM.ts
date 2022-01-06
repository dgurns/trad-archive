import {
	SSMClient,
	GetParameterCommand,
	GetParametersCommand,
} from "@aws-sdk/client-ssm";

const {
	API_AWS_REGION = "",
	API_AWS_ACCESS_KEY_ID = "",
	API_AWS_SECRET_ACCESS_KEY = "",
} = process.env;

const ssmClient = new SSMClient({
	apiVersion: "2006-03-01",
	region: API_AWS_REGION,
	credentials: {
		accessKeyId: API_AWS_ACCESS_KEY_ID,
		secretAccessKey: API_AWS_SECRET_ACCESS_KEY,
	},
});

const getParameter = (parameterName: string) => {
	const command = new GetParameterCommand({
		Name: parameterName,
		WithDecryption: true,
	});
	return ssmClient.send(command);
};

const getParameters = (parameterNames: string[]) => {
	const command = new GetParametersCommand({
		Names: parameterNames,
		WithDecryption: true,
	});
	return ssmClient.send(command);
};

const SSMService = {
	getParameter,
	getParameters,
};
export default SSMService;
