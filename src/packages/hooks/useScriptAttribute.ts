import { useContext } from 'react';
import { IScriptAttributeContext, ScriptAttributeContext } from 'casino/context';


export const useScriptAttribute = (): IScriptAttributeContext => {
	const context = useContext(ScriptAttributeContext);

	if (context === undefined) {
		throw new Error('useScriptAttribute must be used within a ScriptAttributeProvider');
	}

	return context;
};
