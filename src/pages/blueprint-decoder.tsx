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
    <div className="flex flex-1 flex-col gap-4 p-4">
      <Input value={bp} onChange={e => setBp(e.target.value)} />
      <div className="min-h-[100vh] flex-1 rounded-xl bg-muted/50 md:min-h-min">
        <Textarea className="h-full" readOnly disabled value={decodedBp} />
      </div>
    </div>
  )
}