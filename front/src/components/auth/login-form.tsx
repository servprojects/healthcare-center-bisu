// import Alert from "@components/ui/alert";
// import Button from "@components/ui/button";
// import Input from "@components/ui/input";
// import PasswordInput from "@components/ui/password-input";
// import { useLoginMutation } from "@graphql/auth.graphql";
import PasswordInput from '@/components/ui/forms/password-input';
import Alert from '@/components/ui/alert';
import Input from '@/components/ui/forms/input';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useApolloClient } from '@apollo/client';
// import { ROUTES } from "@utils/routes";
import { useTranslation } from 'next-i18next';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
// import { allowedRoles, hasAccess, setAuthCredentials } from "@utils/auth-utils";
// import Link from "@components/ui/link";
import Logo from '../ui/logo';
import { useLoginMutation } from 'graphql/auth.graphql';
import {
  allowedRoles,
  hasAccess,
  setAuthCredentials,
} from '@/utils/auth-utils';
import Button from '@/components/ui/button';
import { ROUTES } from '@/lib/routes';

type FormValues = {
  username: string;
  password: string;
};
const loginFormSchema = yup.object().shape({
  username: yup
    .string()
    // .email("form:error-email-format")
    .required('form:error-email-required'),
  password: yup.string().required('form:error-password-required'),
});
const LoginForm = () => {
  const client = useApolloClient();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [login, { loading }] = useLoginMutation({
    onCompleted: (data) => {
      if (data.login?.token) {
        if (hasAccess(allowedRoles, data.login.permissions)) {
          setAuthCredentials(data.login.token, data.login.permissions);
          router.push(ROUTES.HOME);
          return;
        }
        setErrorMessage('Premission Issues');
      } else {
        setErrorMessage('Credential Issues');
      }
    },
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: yupResolver(loginFormSchema),
  });
  const router = useRouter();
  const { t } = useTranslation('common');

  function onSubmit({ username, password }: FormValues) {
    client.resetStore();
    login({
      variables: {
        username,
        password,
      },
    });
  }
  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <Input
          label={t('Username')}
          {...register('username')}
          type="text"
          // type="email"
          variant="outline"
          className="mb-4"
          // error={t(errors?.email?.message!)}
        />
        <PasswordInput
          label={t('text-password')}
          // forgotPassHelpText={t("form:input-forgot-password-label")}
          {...register('password')}
          error={t(errors?.password?.message!)}
          variant="outline"
          className="mb-4"
          // forgotPageLink={ROUTES.FORGET_PASSWORD}
        />
        <Button className="w-full" loading={loading} disabled={loading}>
          {t('text-login')}
        </Button>

        {/* <div className="flex flex-col items-center justify-center relative text-sm text-heading mt-8 sm:mt-11 mb-6 sm:mb-8">
          <hr className="w-full" />
          <span className="absolute start-2/4 -top-2.5 px-2 -ms-4 bg-light">
            {t("common:text-or")}
          </span>
        </div> */}

        {/* <div className="text-sm sm:text-base text-body text-center">
          {t("form:text-no-account")}{" "}
          <Link
            href={ROUTES.REGISTER}
            className="ms-1 underline text-accent font-semibold transition-colors duration-200 focus:outline-none hover:text-accent-hover focus:text-accent-700 hover:no-underline focus:no-underline"
          >
            {t("form:link-register-shop-owner")}
          </Link>
        </div> */}

        {errorMessage ? (
          <Alert
            message={t(errorMessage)}
            variant="error"
            closeable={true}
            className="mt-5"
            onClose={() => setErrorMessage(null)}
          />
        ) : null}
      </form>
    </>
  );
};
export default function LoginView() {
  const { t } = useTranslation('common');
  return (
    <div className="flex h-full min-h-screen w-screen flex-col justify-center bg-light py-6 px-5 sm:p-8 md:h-auto md:min-h-0 md:max-w-[480px] md:rounded-xl">
      <div className="flex justify-center">
        <Logo />
      </div>
      <p className="mt-4 mb-8 text-center text-sm text-body sm:mt-5 sm:mb-10 md:text-base">
        {t('login-helper')}
      </p>
      <LoginForm />
    </div>
  );
}
