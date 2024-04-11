import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import bcrypt from "bcrypt";
import { userEntity } from "../models/user.model";
declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace Express {
    interface User {
      id: string;
      name: string;
      email: string;
      role?: string | undefined;
      password?: string;
    }
  }
}

export default async function initialize(
  passport: passport.PassportStatic,
  getUserByEmail: (email: string) => Promise<userEntity | undefined>,
  getUserById: (id: string) => Promise<userEntity | undefined>,
) {
  const authenticateUser = async (
    email: string,
    password: string,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    done: any,
  ) => {
    try {
      const user = await getUserByEmail(email);

      if (!user) {
        return done(null, false, { message: "No user with that email" });
      }

      const isPasswordMatch = await bcrypt.compare(
        password,
        user.password as string,
      );
      if (!isPasswordMatch) {
        return done(null, false, { message: "Password incorrect" });
      }

      return done(null, user);
    } catch (error) {
      return done(error);
    }
  };

  passport.use(new LocalStrategy({ usernameField: "email" }, authenticateUser));

  passport.serializeUser((user: userEntity, done) => {
    done(null, user.id);
  });

  passport.deserializeUser(async (id: string, done) => {
    try {
      const user = await getUserById(id);
      done(null, user);
    } catch (error) {
      done(error);
    }
  });
}
