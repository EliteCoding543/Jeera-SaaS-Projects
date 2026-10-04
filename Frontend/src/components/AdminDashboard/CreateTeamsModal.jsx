import React, { useState } from "react";
import { X, Users } from "lucide-react";
import toast from "react-hot-toast";
import { createTeamAdmins } from "../../API's/teamsAPI";
import { useDispatch } from "react-redux";
import { addTeam} from "../../utlis/Redux/teamSlice";

const CreateTeamsModal = ({ setOpenModal }) => {
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
 const dispatch = useDispatch()
  // Create Team Handle
  const handleCreateTeams = async () => {
    if (loading) return;

    const TeamsName = name.trim();

    if (!TeamsName) {
      return toast.error("Please enter your team name");
    }

    setLoading(true);

    try {
     const res = await createTeamAdmins({
        name: TeamsName,
      });

      toast.success(`${TeamsName} is created successfully`);
      dispatch(addTeam(res.data.data))
      setOpenModal(false);
      setName("");
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Failed to create team"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      onClick={() => setOpenModal(false)}
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 px-4 backdrop-blur-sm"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-md overflow-hidden rounded-3xl bg-white shadow-[0_25px_70px_rgba(15,23,42,0.25)]"
      >
        {/* Header */}
        <div className="relative overflow-hidden bg-slate-950 px-6 py-6 text-white">
          <div className="absolute -right-12 -top-12 h-36 w-36 rounded-full bg-slate-700/30 blur-3xl" />

        <button
            type="button"
            onClick={() => setOpenModal(false)}
            className="absolute right-4 top-4 z-20 flex h-10 w-10 cursor-pointer items-center justify-center rounded-xl bg-white/10 text-slate-300 transition-all duration-200 hover:bg-white/20 hover:text-white"
            >
            <X size={20} strokeWidth={2} />
        </button>

          <div className="relative">
            <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-white/10 ring-1 ring-white/10">
              <Users size={19} strokeWidth={1.8} />
            </div>

            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400">
              Workspace
            </p>

            <h2 className="mt-1 text-2xl font-bold tracking-tight text-white">
              Create Team
            </h2>

            <p className="mt-2 text-sm text-slate-400">
              Add a new team to your workspace.
            </p>
          </div>
        </div>

        {/* Body */}
        <div className="p-6">
          <label className="mb-2 block text-sm font-semibold text-slate-700">
            Team name
          </label>

          <input
            type="text"
            maxLength={20}
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter team name"
            className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-medium text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-slate-950 focus:bg-white focus:ring-4 focus:ring-slate-950/5"
          />

          <div className="mt-2 flex items-center justify-between">
            <p className="text-xs text-slate-400">
              Maximum 20 characters
            </p>

            <span className="text-xs font-medium text-slate-400">
              {name.length}/20
            </span>
          </div>

          {/* Buttons */}
          <div className="mt-7 flex justify-end gap-3">
            <button
              onClick={() => setOpenModal(false)}
              disabled={loading}
              className="rounded-xl px-4 py-3 text-sm font-semibold text-slate-500 transition hover:bg-slate-100 hover:text-slate-900 disabled:opacity-50"
            >
              Cancel
            </button>

            <button
              onClick={handleCreateTeams}
              disabled={loading}
              className="cursor-pointer rounded-xl bg-slate-950 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-slate-950/15 transition hover:-translate-y-0.5 hover:bg-slate-800 hover:shadow-xl disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? "Creating..." : "Create Team"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateTeamsModal;