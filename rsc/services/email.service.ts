import EmailTemplates from "email-templates";
import nodemailer, { Transporter } from "nodemailer";
import * as path from "path";

import { configs } from "../configs/config";
import { allTemplates, EEmailActions } from "../constants/email.constants";
import { IC } from "../types/user.types";

class EmailService {
  private transporter: Transporter;
  private templateParser;
  constructor() {
    this.transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: configs.NO_REPLY_EMAIL,
        pass: configs.NO_REPLY_PASSWORD,
      },
    });
    this.templateParser = new EmailTemplates({
      views: {
        root: path.join(process.cwd(), "rsc", "statics"),
        options: {
          extension: "hbs",
        },
      },
      juice: true,
      juiceResources: {
        webResources: {
          relativeTo: path.join(process.cwd(), "rsc", "statics", "css"),
        },
      },
    });
  }
  public async sendMail(email: string, user: any) {
    return this.transporter.sendMail({
      from: "Admin",
      to: email,
      subject: "Profanity",
      html: `<div> this user id:${user._id} emaiL:${user.email} uses profanity more than three times in his description</div>`,
    });
  }

  public async sendViewsDay(
    time: string,
    email: string,
    car: IC,
    carViews: any
  ) {
    return this.transporter.sendMail({
      from: "Admin",
      to: email,
      subject: "ViewsDay",
      html: `<div> Statistics for the ${time} of your auto ${car.mark} views ${carViews} </div>`,
    });
  }

  public async sendE(
    email: string,
    emailActions: EEmailActions,
    locals: Record<string, string> = {}
  ) {
    const templateInfo = allTemplates[emailActions];
    const html = await this.templateParser.render(
      templateInfo.templateName,
      locals
    );

    return this.transporter.sendMail({
      from: "Admin",
      to: email,
      subject: templateInfo.subject,
      html,
    });
  }
}
export const emailService = new EmailService();
