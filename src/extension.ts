import * as vscode from 'vscode';
import { authenticate } from './authenticate';
import { MainPanel } from './MainPanel';
import { SidebarProvider } from "./SidebarProvider";

export function activate(context: vscode.ExtensionContext) {

	context.subscriptions.push(vscode.commands.registerCommand('vsbuddies.helloWorld', () => {
		MainPanel.createOrShow(context.extensionUri);
		// console.log(vscode.extensions.all.map(ext=>ext.packageJSON.name));
	})
	);
	
	context.subscriptions.push(vscode.commands.registerCommand('vsbuddies.authenticate', () => {
		authenticate();
	})
	);
	const sidebarProvider = new SidebarProvider(context.extensionUri);
	context.subscriptions.push(
		vscode.window.registerWebviewViewProvider(
		"vsbuddies-sidebar",
		sidebarProvider
	)
	);

	context.subscriptions.push(vscode.commands.registerCommand('vsbuddies.refreshExtensions', () => {
		const userExtensions = vscode.extensions.all.map(ext=>ext.packageJSON.name);
		sidebarProvider._view?.webview.postMessage({
			type: "extensions",
			value: userExtensions
		});
	})
	);

}

// this method is called when your extension is deactivated
export function deactivate() {}
