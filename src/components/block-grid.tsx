import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface BlockGridProps {
  blocks: string[];
}

export function BlockGrid({ blocks }: BlockGridProps) {
  return (
    <section className="grid grid-cols-12 gap-4">
      {blocks.map((blockName, idx) => (
        <Card key={blockName} className={idx % 3 === 0 ? "col-span-12 lg:col-span-6" : "col-span-12 md:col-span-6 lg:col-span-3"}>
          <CardHeader>
            <CardTitle>{blockName}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex h-36 items-center justify-center rounded-md border border-dashed border-primary/30 bg-primary/5 text-sm text-muted-foreground">
              图表/指标占位区
            </div>
          </CardContent>
        </Card>
      ))}
    </section>
  );
}
