import { relationsTable } from "@/app/db/schema";
import Card from "../../card";

interface Props {
  relations: typeof relationsTable.$inferSelect;
  setForm: (action: { type: string; value: string }) => void;
}

const RelationCardForm = ({ relations, setForm }: Props) => {
  const InputContainer = ({
    name,
    children,
  }: {
    name: string;
    children: any;
  }) => (
    <div className="flex items-baseline justify-center">
      <label
        className="mb-3 mt-5 block text-xs font-medium w-20"
        htmlFor="email"
      >
        {name} : &nbsp;
      </label>
      <div className="relative">{children}</div>
    </div>
  );

  return (
    <Card className="grid grid-flow-row grid-cols-1 md:grid-cols-2 gap-2">
      <InputContainer name="Proche">
        <input
          defaultValue={relations.close}
          className="peer block w-40 rounded-md border p-2 text-sm outline-2 border-content2 bg-background text-foreground"
          id="close"
          name="close"
          onBlur={(e) => setForm({ type: "close", value: e.target.value })}
          placeholder=""
        />
      </InputContainer>
      <InputContainer name="Opposé">
        <input
          defaultValue={relations?.opposite}
          className="peer block w-40 rounded-md border p-2 text-sm outline-2 border-content2 bg-background text-foreground"
          id="opposite"
          name="opposite"
          onBlur={(e) => setForm({ type: "opposite", value: e.target.value })}
          placeholder=""
        />
      </InputContainer>
      <InputContainer name="Éloigné">
        <input
          defaultValue={relations?.distant}
          className="peer block w-40 rounded-md border p-2 text-sm outline-2 border-content2 bg-background text-foreground"
          id="distant"
          name="distant"
          onBlur={(e) => setForm({ type: "distant", value: e.target.value })}
          placeholder=""
        />
      </InputContainer>
      <InputContainer name="Ennemi">
        <input
          defaultValue={relations?.enemy}
          className="peer block w-40 rounded-md border p-2 text-sm outline-2 border-content2 bg-background text-foreground"
          id="enemy"
          name="enemy"
          onBlur={(e) => setForm({ type: "enemy", value: e.target.value })}
          placeholder=""
        />
      </InputContainer>
    </Card>
  );
};

export default RelationCardForm;
