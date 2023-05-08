import { parseYaml } from "obsidian";
import { ChessifyPluginSettings } from "src/components/obsidian/SettingsTab";
import { Chess, QUEEN, SQUARES, Square } from "chess.js";
import { Api } from "chessground/api";
import { Config } from "chessground/config";

type ChessifyAppConfig = ChessifyPluginSettings & {
	fen: string;
};

export const parseUserConfig = (
	settings: ChessifyPluginSettings,
	content: string
): ChessifyAppConfig => {
	const chessifyConfig: ChessifyAppConfig = {
		...settings,
		fen: "",
	};

	try {
		return {
			...chessifyConfig,
			...parseYaml(content),
		};
	} catch (e) {
		throw Error("Something went wrong during parsing. :(");
	}
};

export function toColor(chess: Chess) {
	return chess.turn() === "w" ? "white" : "black";
}

export function toDests(chess: Chess): Map<Square, Square[]> {
	const dests = new Map();
	SQUARES.forEach((s) => {
		const ms = chess.moves({ square: s, verbose: true });
		if (ms.length)
			dests.set(
				s,
				ms.map((m) => m.to)
			);
	});
	return dests;
}

export function playOtherSide(cg: Api, chess: Chess) {
	return (orig: string, dest: string) => {
		const move = chess.move({ from: orig, to: dest, promotion: QUEEN });

		const commonTurnProperties: Partial<Config> = {
			turnColor: toColor(chess),
			movable: {
				color: toColor(chess),
				dests: toDests(chess),
			},
			check: chess.isCheck(),
		};

		if (move.flags === "e" || move.promotion) {
			//Handle En Passant && Promote to Queen by default
			cg.set({
				fen: chess.fen(),
				...commonTurnProperties,
			});
		} else {
			cg.set(commonTurnProperties);
		}
	};
}
