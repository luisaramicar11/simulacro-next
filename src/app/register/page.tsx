"use client";

import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import styled from "styled-components";
import { toast } from "react-toastify";

// Estilos usando styled-components
const Container = styled.div`
  max-width: 600px;
  margin: 0 auto;
  padding: 2rem;
  background-color: #f7f7f7;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

const Title = styled.h1`
  font-size: 2rem;
  margin-bottom: 1.5rem;
  text-align: center;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const Label = styled.label`
  font-weight: bold;
  margin-bottom: 0.5rem;
`;

const Input = styled.input`
  padding: 0.75rem;
  margin-bottom: 1rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 1rem;
  &:focus {
    border-color: #0070f3;
    outline: none;
  }
`;

const Button = styled.button`
  padding: 0.75rem;
  background-color: #0070f3;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  cursor: pointer;
  &:hover {
    background-color: #005bb5;
  }
`;

const ErrorList = styled.ul`
  margin: 0;
  padding: 1rem;
  background-color: #f8d7da;
  color: #721c24;
  border: 1px solid #f5c6cb;
  border-radius: 4px;
  list-style: none;
`;

const ErrorItem = styled.li`
  margin-bottom: 0.5rem;
`;

interface IName {
  firstname: string;
  lastname: string;
}

interface IGeolocation {
  lat: string;
  long: string;
}

interface IAddress {
  street: string;
  city: string;
  number: number;
  zipcode: string;
  geolocation: IGeolocation;
}

const RegisterPage = () => {
  const [errors, setErrors] = useState<string[]>([]);
  const [username, setUsername] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [name, setName] = useState<IName>({ firstname: "", lastname: "" });
  const [address, setAddress] = useState<IAddress>({
    street: "",
    city: "",
    number: 0,
    zipcode: "",
    geolocation: { lat: "", long: "" },
  });
  const [phone, setPhone] = useState<string>("");
  const router = useRouter();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setErrors([]);

    const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/users`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        username,
        password,
        name:
        address,
        phone,
      }),
    });

    const responseAPI = await res.json();

    if (!res.ok) {
      setErrors(responseAPI.message);
      return;
    }

    const responseNextAuth = await signIn("credentials", {
      username,
      password,
      redirect: false,
    });

    if (responseNextAuth?.error) {
      setErrors(responseNextAuth.error.split(","));
      toast.error("Ocurrio un error");
      return;
    }
    
    toast.success("Login exitoso");
    router.push("/login");
  };

  return (
    <Container>
      <Title>Register</Title>
      <Form onSubmit={handleSubmit}>
        <Label htmlFor="firstname">First Name</Label>
        <Input
          type="text"
          placeholder="First Name"
          name="firstname"
          value={name.firstname}
          onChange={(event) =>
            setName({ ...name, firstname: event.target.value })
          }
        />

        <Label htmlFor="lastname">Last Name</Label>
        <Input
          type="text"
          placeholder="Last Name"
          name="lastname"
          value={name.lastname}
          onChange={(event) =>
            setName({ ...name, lastname: event.target.value })
          }
        />

        <Label htmlFor="email">Email</Label>
        <Input
          type="email"
          placeholder="test@test.com"
          name="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
        />

        <Label htmlFor="password">Password</Label>
        <Input
          type="password"
          placeholder="Password"
          name="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        />

        <Label htmlFor="username">Username</Label>
        <Input
          type="text"
          placeholder="Username"
          name="username"
          value={username}
          onChange={(event) => setUsername(event.target.value)}
        />

        <Label htmlFor="street">Street</Label>
        <Input
          type="text"
          placeholder="Street"
          name="street"
          value={address.street}
          onChange={(event) =>
            setAddress({ ...address, street: event.target.value })
          }
        />

        <Label htmlFor="city">City</Label>
        <Input
          type="text"
          placeholder="City"
          name="city"
          value={address.city}
          onChange={(event) =>
            setAddress({ ...address, city: event.target.value })
          }
        />

        <Label htmlFor="number">Number</Label>
        <Input
          type="number"
          placeholder="Number"
          name="number"
          value={address.number}
          onChange={(event) =>
            setAddress({ ...address, number: parseInt(event.target.value) })
          }
        />

        <Label htmlFor="zipcode">Zipcode</Label>
        <Input
          type="text"
          placeholder="Zipcode"
          name="zipcode"
          value={address.zipcode}
          onChange={(event) =>
            setAddress({ ...address, zipcode: event.target.value })
          }
        />

        <Label htmlFor="lat">Latitude</Label>
        <Input
          type="text"
          placeholder="Latitude"
          name="lat"
          value={address.geolocation.lat}
          onChange={(event) =>
            setAddress({
              ...address,
              geolocation: {
                ...address.geolocation,
                lat: event.target.value,
              },
            })
          }
        />

        <Label htmlFor="long">Longitude</Label>
        <Input
          type="text"
          placeholder="Longitude"
          name="long"
          value={address.geolocation.long}
          onChange={(event) =>
            setAddress({
              ...address,
              geolocation: {
                ...address.geolocation,
                long: event.target.value,
              },
            })
          }
        />

        <Label htmlFor="phone">Phone</Label>
        <Input
          type="text"
          placeholder="Phone"
          name="phone"
          value={phone}
          onChange={(event) => setPhone(event.target.value)}
        />

        <Button type="submit">Register</Button>
      </Form>

      {errors.length > 0 && (
        <ErrorList>
          {errors.map((error) => (
            <ErrorItem key={error}>{error}</ErrorItem>
          ))}
        </ErrorList>
      )}
    </Container>
  );
};

export default RegisterPage;
