import { ArrowLeft, ArrowRight, Copy, Save, Undo2 } from 'lucide-react';
import * as React from 'react';

export interface ControlActions {
	onUndoButtonClick: () => void;
	onBackButtonClick: () => void;
	onForwardButtonClick: () => void;
	onSaveButtonClick: () => void;
	onCopyButtonClick: () => void;
}

export const Controls = (props: ControlActions) => {
	return (
		<div>
			<div className="button-section">
				<button title="Back" onClick={() => props.onBackButtonClick()}>
					<ArrowLeft />
				</button>
				<button title="Forward" onClick={() => props.onForwardButtonClick()}>
					<ArrowRight />
				</button>
				<button title="Save" onClick={() => props.onSaveButtonClick()}>
					<Save strokeWidth={'1px'} />
				</button>
			</div>
			<div className="button-section">
				<button title="Copy FEN" onClick={() => props.onCopyButtonClick()}>
					<Copy strokeWidth={'1px'} />
				</button>
				<button title="Undo" onClick={() => props.onUndoButtonClick()}>
					<Undo2 />
				</button>
			</div>
		</div>
	);
};
