'use client';

import { useState } from 'react';

import { useAuthContext } from '@context/AuthContext';

import { WavyBackground } from '@components/aceternity/wavy-background';
import { Button } from '@components/shadcn/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@components/shadcn/ui/card';
import { Input } from '@components/shadcn/ui/input';
import { Label } from '@components/shadcn/ui/label';

export default function Home() {
  const { setToken } = useAuthContext();
  const [tokenValue, setTokenValue] = useState<string | undefined>();

  const handleSubmit = () => {
    if (tokenValue) {
      setToken(tokenValue);
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-between">
      <WavyBackground className="max-w-4xl mx-auto pb-40">
        <Card>
          <CardHeader>
            <CardTitle>Unsafe Login</CardTitle>
            <CardDescription>
              Paste your bearer token, token will be saved in local storage until you log out
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Label htmlFor="token">Token</Label>
            <Input id="token" placeholder="Token" value={tokenValue} />
          </CardContent>
          <CardFooter>
            <Button onClick={handleSubmit}>Submit</Button>
          </CardFooter>
        </Card>
      </WavyBackground>
    </main>
  );
}
