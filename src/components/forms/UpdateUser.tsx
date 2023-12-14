import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useUserProfile } from "#/state/profile";
import { updateUserSchema } from "./validation";

type Inputs = {
  username: string;
};

export function UpdateUserForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>({
    resolver: yupResolver(signUpSchema),
  });

  const onSubmit: SubmitHandler<Inputs> = data => signUp(data);

  return <form onSubmit={handleSubmit(onSubmit)}>test</form>;
}
