import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { decodeBlueprint } from "@/lib/factorio-blueprints";
import { useMemo, useState } from "react";

export function BlueprintDecoder() {
  const [bp, setBp] = useState('');

  const decodedBp = useMemo(
    () => {
      try
      {
        const decoded = decodeBlueprint(bp);
        return JSON.stringify(decoded, null, 2)
      }
      catch
      {
        return ""
      }
    },
    [bp]
  );

  return (
    <>
      <div className="grid auto-rows-min gap-4 md:grid-cols-3">
        <Input value={bp} onChange={e => setBp(e.target.value)} />
      </div>
      <div className="min-h-[100vh] flex-1 rounded-xl bg-muted/50 md:min-h-min">
        <Textarea className="h-full"
         value={decodedBp} readOnly disabled/>
      </div>
    </>
  )
}