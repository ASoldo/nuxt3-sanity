


const scriptsInEvents = {

	async ["Maingame-Es_Event1_Act1"](runtime, localVars)
	{
		parent.postMessage({message:'Signal'}, '*');
		console.log("Message Signal sent");
	},

	async ["Maingame-Es_Event63"](runtime, localVars)
	{
		let now = new Date();
		
		runtime.globalVars.milliseconds = now.getMilliseconds();
	}

};

self.C3.ScriptsInEvents = scriptsInEvents;

