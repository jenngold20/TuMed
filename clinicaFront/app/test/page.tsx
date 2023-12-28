import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Cross2Icon, MixerHorizontalIcon } from "@radix-ui/react-icons"

const Search = () => {
  const especialidades = [
    "Cardiologia",
    "Dermatologia",
    "Endocrinologia",
    "Gastroenterologia",
    "Ginecologia",
    "Hematologia",
  ]

  return (
    <div className="h-screen flex items-center justify-center">
      <Card className="max-w-2xl w-full">
        <CardHeader>
          <CardTitle>Buscar</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between gap-1 mb-2">
            <div className="grid grid-cols-3 gap-1">
              {especialidades.map((especialidad) => (
                <Badge
                  variant="secondary"
                  key={especialidad}
                  className="cursor-pointer gap-1"
                >
                  {especialidad}
                  <Cross2Icon className="w-3 h-3" />
                </Badge>
              ))}
            </div>
            <Button className="flex items-center gap-1" variant="outline">
              <MixerHorizontalIcon className="w-5 h-5" />
              Filtros
            </Button>
          </div>
          <div className="flex gap-1 items-center">
            <Input placeholder="Buscar..." type="text" />
            <Button>Buscar</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default Search
