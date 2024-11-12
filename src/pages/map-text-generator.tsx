import { Button } from "@/components/ui/button";
import { encodeBlueprint } from "@/lib/factorio-blueprints";
import { drawBitmapText } from "@/lib/utils";


export function MapTextGenerator() {

  const handleButtonClick = () => {
    drawBitmapText("Hello world!", "/factorio-tools/fonts/bitocra/bitbuntu.bdf")
      .then(x => console.log(x));

    // console.log(renderedText);
  }

  return (
    <>
      <div className="grid auto-rows-min gap-4 md:grid-cols-3">
        <div className="aspect-video rounded-xl bg-muted/50" />
        <div className="aspect-video rounded-xl bg-muted/50" />
        <Button onClick={handleButtonClick} className="rounded-xl">BOO!</Button>
      </div>
      <div className="min-h-[100vh] flex-1 rounded-xl bg-muted/50 md:min-h-min" />
    </>
  )
}