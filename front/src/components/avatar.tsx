import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export function DataCollaborator() {
  return (
    <div className="flex items-center gap-2 text-sm">
      <Avatar className="size-7">
        <AvatarImage src="https://github.com/shadcn.png" />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>
      <div>
      <p>Leonardo Cunha</p>
        <p className="font-light text-stone-600">Suporte T.I</p>
      </div>
    </div>
  );
}
