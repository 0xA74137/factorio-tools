import { useAxios } from "@/components/axios-provider";
import { Input } from "@/components/ui/input";
import { Select, SelectItem, SelectTrigger, SelectValue, SelectContent } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { encodeBlueprint } from "@/lib/factorio-blueprints";
import { newWrappedBlueprint } from "@/lib/factorio-blueprints/factory";
import { useMapTextGeneratorStore } from "@/store";
import { useQuery } from '@tanstack/react-query'
import { useThrottle } from '@uidotdev/usehooks'
import { $Font } from "bdfparser";

async function* linesAsAsyncIterableIterator(text: string) : AsyncIterableIterator<string> {
  for (const line of text.split("\n")) {
    yield line;
  }
}

type Fonts = string[]

export function MapTextGenerator() {
  const state = useMapTextGeneratorStore();
  const throttledText = useThrottle(state.text, 300);
  const axios = useAxios();

  const { data: fonts } = useQuery({
    queryKey: ['font-index'],
    queryFn: async () => {
      const fonts = await axios.get<Fonts>("/fonts/index.json");
      console.log(fonts.data);
      return fonts.data;
    }
  })

  const { data: font, isLoading: fontLoading } = useQuery({
    queryKey: ['font', state.font],
    queryFn: async () => {
      const response = await axios.get<string>(`/fonts/${state.font}`)

      const font = await $Font(linesAsAsyncIterableIterator(response.data))
      if(!font || !font.headers){
        throw new Error('Unable to load font')
      }

      return font;
    },
    enabled: !!state.font
  })

  const { data: renderedText } = useQuery({
    queryKey: ['draw', state.font, throttledText],
    queryFn: async () =>
      font?.draw(throttledText).toString().replace(/\./g, " "),
    enabled: !!font
  })

  const handleButtonClick = () => {
    if(renderedText === undefined)
      return;

    const bp = newWrappedBlueprint(state.text);
    bp.blueprint.icons = []

    for (let i = 0; i < Math.min(4, state.text.length); i++) {
      bp.blueprint.icons?.push({
        index: i+1,
        signal: {
          type: "virtual",
          name: `signal-${state.text.at(i)?.toUpperCase()}`
        }
      })
    }

    let entityIndex = 1;
    const lines = renderedText.split("\n")
    for (let y = 0; y < lines.length; y++) {
      const line = lines[y];
      
      for (let x = 0; x < line.length; x++) {
        const char = line[x];
        
        if(char !== "#")
          continue;

        bp.blueprint.entities.push({
          entity_number: entityIndex++,
          name: "textplate-large-plastic",
          variation: 2,
          position: { x:x*2, y:y*2 }
        })
      }
    }

    console.log(encodeBlueprint(bp));
    navigator.clipboard.writeText(encodeBlueprint(bp));
  }

  return (
    <div className="flex flex-1 flex-col gap-4 p-4">
      <div className="flex flex-row">
        <Input value={state.text} onChange={e => state.updateText(e.target.value)} />
        <Select value={state.font} onValueChange={e => state.updateFont(e)} >
          <SelectTrigger>
            <SelectValue placeholder="Select a font" />
          </SelectTrigger>
          <SelectContent>
            { fonts?.map(font => <SelectItem value={font}>{font}</SelectItem>)}
          </SelectContent>
        </Select>
      </div>
      <div className="min-h-[100vh] flex-1 rounded-xl bg-muted/50 md:min-h-min">
        { fontLoading ? "loading font..." : 
          <Textarea onClick={handleButtonClick} value={renderedText} className="font-mono h-full" readOnly/> }
      </div>
    </div>
  )
}
