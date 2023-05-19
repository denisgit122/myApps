import { viewsDay, viewsMonth, viewsWeek } from "./send.views.day.cron";

export const cronRunner = () => {
  viewsDay.start();
  viewsMonth.start();
  viewsWeek.start();
};
