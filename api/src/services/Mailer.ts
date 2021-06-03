import sendgrid, { MailDataRequired } from '@sendgrid/mail';
import { User } from 'models/User';
import AuthService from 'services/Auth';

const { SENDGRID_API_KEY, WEB_ORIGIN } = process.env;

sendgrid.setApiKey(SENDGRID_API_KEY ?? '');

const sendEmail = (data: MailDataRequired) => {
  return sendgrid.send(data);
};

interface SendEmailWithAutoLoginUrlArgs {
	user: User;
	autoLoginTokenUnhashed: string;
}
const sendEmailWithAutoLoginUrl = ({ user, autoLoginTokenUnhashed }: SendEmailWithAutoLoginUrlArgs) => {
  if (!user || !autoLoginTokenUnhashed) {
    throw new Error('User and auto login token must be provided');
  }

  const autoLoginUrl = AuthService.buildAutoLoginUrl(autoLoginTokenUnhashed);

  const data = {
    to: user.email,
    from: `no-reply@${WEB_ORIGIN}`,
    subject: 'Your login for Trad Archive',
    text: `Hi ${user.username}, click this link to log in to Trad Archive: ${autoLoginUrl} . It will be valid for the next 10 minutes. If you didn't request this, you can ignore this email.`,
  };

  return sendEmail(data);
};

export default {
  sendEmail,
  sendEmailWithAutoLoginUrl,
};