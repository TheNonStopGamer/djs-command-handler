import { RunFunc } from "../Typings";
import { Option } from "./Option";

export class SubCommand {
	public readonly run: RunFunc;

	public readonly name: string;
	public readonly description: string;

	public options: Option[];

	constructor(
		name: string,
		description: string,
		options: Option[],
		run: RunFunc
	) {
		this.run = run;

		this.name = name;
		this.description = description;

		this.options = options;
	}
}