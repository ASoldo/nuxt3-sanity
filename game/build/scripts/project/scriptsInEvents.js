


const scriptsInEvents = {

	async ["Maingame-Es_Event1_Act1"](runtime, localVars)
	{
		parent.postMessage({message:'Signal'}, '*');
		console.log("Message Signal sent");
	}

};

self.C3.ScriptsInEvents = scriptsInEvents;

