import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { decodeBlueprint } from "@/lib/factorio-blueprints";
import { useBlueprintDecoderStore } from "@/store";
import { useMemo } from "react";

export function BlueprintDecoder() {
  const state = useBlueprintDecoderStore();

  const decodedBp = useMemo(
    () => {
      try
      {
        const decoded = decodeBlueprint(state.bp);
        return JSON.stringify(decoded, null, 2)
      }
      catch
      {
        return ""
      }
    },
    [state.bp]
  );

  return (
    <div className="flex flex-1 flex-col gap-4 p-4">
      <Input value={state.bp} onChange={e => state.updateBp(e.target.value)} />
      <div className="min-h-[100vh] flex-1 rounded-xl bg-muted/50 md:min-h-min">
        <Textarea className="h-full" readOnly disabled value={decodedBp} />
      </div>
    </div>
  )
}