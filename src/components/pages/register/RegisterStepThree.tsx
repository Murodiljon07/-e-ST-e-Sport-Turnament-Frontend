"use client";

import React from "react";
import { FormData, Errors, Game, TempGame } from "@/types/register.type";

interface Props {
  form: FormData;
  errors: Errors;
  tempGame: TempGame;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onTempGameChange: (game: TempGame) => void;
  onAddGame: () => void;
  onRemoveGame: (index: number) => void;
}

export const RegisterStepThree: React.FC<Props> = ({
  form,
  errors,
  tempGame,
  onChange,
  onTempGameChange,
  onAddGame,
  onRemoveGame,
}) => {
  return (
    <div className="space-y-5 animate-fadeIn">
      <div className="space-y-4">
        <h3 className="text-white font-medium">Main Game</h3>
        <div>
          <input
            type="text"
            name="mainGame.game"
            value={form.mainGame.game}
            onChange={onChange}
            placeholder="Game name (e.g., Valorant)"
            className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-white/30 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all mb-3"
          />
          <input
            type="text"
            name="mainGame.playerId"
            value={form.mainGame.playerId}
            onChange={onChange}
            placeholder="Player ID / Username"
            className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-white/30 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all"
          />
        </div>
        {errors["mainGame.game"] && (
          <p className="mt-1 text-xs text-red-400">{errors["mainGame.game"]}</p>
        )}
        {errors["mainGame.playerId"] && (
          <p className="mt-1 text-xs text-red-400">
            {errors["mainGame.playerId"]}
          </p>
        )}
      </div>

      <div className="space-y-3">
        <h3 className="text-white font-medium">Other Games (Optional)</h3>
        <div className="flex gap-2">
          <input
            type="text"
            value={tempGame.name}
            onChange={(e) =>
              onTempGameChange({ ...tempGame, name: e.target.value })
            }
            placeholder="Game name"
            className="flex-1 px-4 py-2 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-white/30 focus:outline-none focus:border-purple-500 text-sm"
          />
          <input
            type="text"
            value={tempGame.playerId}
            onChange={(e) =>
              onTempGameChange({ ...tempGame, playerId: e.target.value })
            }
            placeholder="Player ID"
            className="flex-1 px-4 py-2 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-white/30 focus:outline-none focus:border-purple-500 text-sm"
          />
          <button
            onClick={onAddGame}
            className="px-4 py-2 bg-purple-500/20 hover:bg-purple-500/30 border border-purple-500/30 rounded-xl text-purple-300 transition-all"
          >
            +
          </button>
        </div>

        {form.games.length > 0 && (
          <div className="space-y-2 mt-3">
            {form.games.map((game: Game, idx: number) => (
              <div
                key={idx}
                className="flex items-center justify-between p-3 bg-white/5 rounded-xl border border-white/10"
              >
                <div>
                  <p className="text-white text-sm font-medium">{game.name}</p>
                  <p className="text-white/50 text-xs">{game.playerId}</p>
                </div>
                <button
                  onClick={() => onRemoveGame(idx)}
                  className="text-red-400 hover:text-red-300 transition-colors"
                >
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
