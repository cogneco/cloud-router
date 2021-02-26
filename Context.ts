import * as http from "cloud-http"
import { Callback } from "./Callback"
export class Context {
	private callbacks: Callback[] = []
	register(callback: Callback): void {
		if (Callback.is(callback))
			this.callbacks.push(callback)
	}

	error(error: Error): void {
		for (const callback of this.callbacks)
			callback.error(error)
	}
	async finish(): Promise<void> {
		for (const callback of this.callbacks)
			await callback.execute()
		this.callbacks = []
	}
}