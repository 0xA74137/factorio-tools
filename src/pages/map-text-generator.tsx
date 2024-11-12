import { Button } from "@/components/ui/button";
import { encodeBlueprint } from "@/lib/factorio-blueprints";
import { newBlueprint } from "@/lib/factorio-blueprints/factory";
import { drawBitmapText } from "@/lib/utils";


export function MapTextGenerator() {

  const handleButtonClick = () => {
    drawBitmapText("Hello world!", "/factorio-tools/fonts/bitocra/bitbuntu.bdf")
      .then(x => console.log(x));

    const bp = newBlueprint("text");

    // console.log(renderedText);
  }

  return (
    <div className="flex flex-1 flex-col gap-4 p-4">
      <div className="grid auto-rows-min gap-4 md:grid-cols-3">
        <div className="aspect-video rounded-xl bg-muted/50" />
        <div className="aspect-video rounded-xl bg-muted/50" />
        <Button onClick={handleButtonClick} className="rounded-xl">BOO!</Button>
      </div>
      <div className="min-h-[100vh] flex-1 rounded-xl bg-muted/50 md:min-h-min" />
    </div>
  )
}