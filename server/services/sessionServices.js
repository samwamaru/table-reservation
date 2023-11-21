import SessionModel from "../models/Session.model.js";

export async function createSession(userId, userAgent) {
    const session = await SessionModel.create({ user: userId, userAgent });
  
    return session.toJSON();
  }
  