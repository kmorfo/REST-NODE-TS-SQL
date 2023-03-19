--
-- PostgreSQL database dump
--

-- Dumped from database version 15.2 (Debian 15.2-1.pgdg110+1)
-- Dumped by pg_dump version 15.2

-- Started on 2023-03-19 15:26:27 CET

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- TOC entry 4 (class 2615 OID 2200)
-- Name: public; Type: SCHEMA; Schema: -; Owner: pg_database_owner
--

CREATE SCHEMA public;


ALTER SCHEMA public OWNER TO pg_database_owner;

--
-- TOC entry 3376 (class 0 OID 0)
-- Dependencies: 4
-- Name: SCHEMA public; Type: COMMENT; Schema: -; Owner: pg_database_owner
--

COMMENT ON SCHEMA public IS 'standard public schema';


--
-- TOC entry 853 (class 1247 OID 20219)
-- Name: enum_Users_role; Type: TYPE; Schema: public; Owner: pgadmin
--

CREATE TYPE public."enum_Users_role" AS ENUM (
    'USER',
    'ADMIN',
    'SALES'
);


ALTER TYPE public."enum_Users_role" OWNER TO pgadmin;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- TOC entry 219 (class 1259 OID 20209)
-- Name: Categories; Type: TABLE; Schema: public; Owner: pgadmin
--

CREATE TABLE public."Categories" (
    id integer NOT NULL,
    name character varying(255) NOT NULL,
    state boolean DEFAULT true,
    "createdAt" timestamp with time zone,
    "updatedAt" timestamp with time zone,
    "UserId" integer NOT NULL
);


ALTER TABLE public."Categories" OWNER TO pgadmin;

--
-- TOC entry 216 (class 1259 OID 20197)
-- Name: Categories_id_seq; Type: SEQUENCE; Schema: public; Owner: pgadmin
--

CREATE SEQUENCE public."Categories_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."Categories_id_seq" OWNER TO pgadmin;

--
-- TOC entry 3377 (class 0 OID 0)
-- Dependencies: 216
-- Name: Categories_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: pgadmin
--

ALTER SEQUENCE public."Categories_id_seq" OWNED BY public."Categories".id;


--
-- TOC entry 218 (class 1259 OID 20199)
-- Name: Products; Type: TABLE; Schema: public; Owner: pgadmin
--

CREATE TABLE public."Products" (
    id integer NOT NULL,
    name character varying(255) NOT NULL,
    price real DEFAULT '0'::real,
    description character varying(255) DEFAULT ''::character varying NOT NULL,
    image character varying(255),
    available boolean DEFAULT true NOT NULL,
    state boolean DEFAULT true NOT NULL,
    "createdAt" timestamp with time zone,
    "updatedAt" timestamp with time zone,
    "UserId" integer NOT NULL,
    "CategoryId" integer NOT NULL
);


ALTER TABLE public."Products" OWNER TO pgadmin;

--
-- TOC entry 217 (class 1259 OID 20198)
-- Name: Products_id_seq; Type: SEQUENCE; Schema: public; Owner: pgadmin
--

CREATE SEQUENCE public."Products_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."Products_id_seq" OWNER TO pgadmin;

--
-- TOC entry 3378 (class 0 OID 0)
-- Dependencies: 217
-- Name: Products_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: pgadmin
--

ALTER SEQUENCE public."Products_id_seq" OWNED BY public."Products".id;


--
-- TOC entry 215 (class 1259 OID 19085)
-- Name: Roles; Type: TABLE; Schema: public; Owner: pgadmin
--

CREATE TABLE public."Roles" (
    id integer NOT NULL,
    name character varying(255) NOT NULL,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);


ALTER TABLE public."Roles" OWNER TO pgadmin;

--
-- TOC entry 214 (class 1259 OID 19084)
-- Name: Roles_id_seq; Type: SEQUENCE; Schema: public; Owner: pgadmin
--

CREATE SEQUENCE public."Roles_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."Roles_id_seq" OWNER TO pgadmin;

--
-- TOC entry 3379 (class 0 OID 0)
-- Dependencies: 214
-- Name: Roles_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: pgadmin
--

ALTER SEQUENCE public."Roles_id_seq" OWNED BY public."Roles".id;


--
-- TOC entry 221 (class 1259 OID 20230)
-- Name: Users; Type: TABLE; Schema: public; Owner: pgadmin
--

CREATE TABLE public."Users" (
    id integer NOT NULL,
    name character varying(255) NOT NULL,
    lastname character varying(255) NOT NULL,
    email character varying(255) NOT NULL,
    password character varying(255) NOT NULL,
    image character varying(255),
    role public."enum_Users_role" DEFAULT 'USER'::public."enum_Users_role",
    state boolean DEFAULT true,
    google boolean DEFAULT false,
    "createdAt" timestamp with time zone,
    "updatedAt" timestamp with time zone
);


ALTER TABLE public."Users" OWNER TO pgadmin;

--
-- TOC entry 220 (class 1259 OID 20229)
-- Name: Users_id_seq; Type: SEQUENCE; Schema: public; Owner: pgadmin
--

CREATE SEQUENCE public."Users_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."Users_id_seq" OWNER TO pgadmin;

--
-- TOC entry 3380 (class 0 OID 0)
-- Dependencies: 220
-- Name: Users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: pgadmin
--

ALTER SEQUENCE public."Users_id_seq" OWNED BY public."Users".id;


--
-- TOC entry 3198 (class 2604 OID 20212)
-- Name: Categories id; Type: DEFAULT; Schema: public; Owner: pgadmin
--

ALTER TABLE ONLY public."Categories" ALTER COLUMN id SET DEFAULT nextval('public."Categories_id_seq"'::regclass);


--
-- TOC entry 3193 (class 2604 OID 20202)
-- Name: Products id; Type: DEFAULT; Schema: public; Owner: pgadmin
--

ALTER TABLE ONLY public."Products" ALTER COLUMN id SET DEFAULT nextval('public."Products_id_seq"'::regclass);


--
-- TOC entry 3192 (class 2604 OID 19088)
-- Name: Roles id; Type: DEFAULT; Schema: public; Owner: pgadmin
--

ALTER TABLE ONLY public."Roles" ALTER COLUMN id SET DEFAULT nextval('public."Roles_id_seq"'::regclass);


--
-- TOC entry 3200 (class 2604 OID 20233)
-- Name: Users id; Type: DEFAULT; Schema: public; Owner: pgadmin
--

ALTER TABLE ONLY public."Users" ALTER COLUMN id SET DEFAULT nextval('public."Users_id_seq"'::regclass);


--
-- TOC entry 3368 (class 0 OID 20209)
-- Dependencies: 219
-- Data for Name: Categories; Type: TABLE DATA; Schema: public; Owner: pgadmin
--

COPY public."Categories" (id, name, state, "createdAt", "updatedAt", "UserId") FROM stdin;
\.


--
-- TOC entry 3367 (class 0 OID 20199)
-- Dependencies: 218
-- Data for Name: Products; Type: TABLE DATA; Schema: public; Owner: pgadmin
--

COPY public."Products" (id, name, price, description, image, available, state, "createdAt", "updatedAt", "UserId", "CategoryId") FROM stdin;
\.


--
-- TOC entry 3364 (class 0 OID 19085)
-- Dependencies: 215
-- Data for Name: Roles; Type: TABLE DATA; Schema: public; Owner: pgadmin
--

COPY public."Roles" (id, name, "createdAt", "updatedAt") FROM stdin;
1	ADMIN	2023-03-16 22:01:21.876673+00	2023-03-16 22:01:21.876673+00
2	USER	2023-03-16 22:01:27.07607+00	2023-03-16 22:01:27.07607+00
3	SALES	2023-03-16 22:01:33.366392+00	2023-03-16 22:01:33.366392+00
\.


--
-- TOC entry 3370 (class 0 OID 20230)
-- Dependencies: 221
-- Data for Name: Users; Type: TABLE DATA; Schema: public; Owner: pgadmin
--

COPY public."Users" (id, name, lastname, email, password, image, role, state, google, "createdAt", "updatedAt") FROM stdin;
\.


--
-- TOC entry 3381 (class 0 OID 0)
-- Dependencies: 216
-- Name: Categories_id_seq; Type: SEQUENCE SET; Schema: public; Owner: pgadmin
--

SELECT pg_catalog.setval('public."Categories_id_seq"', 1, true);


--
-- TOC entry 3382 (class 0 OID 0)
-- Dependencies: 217
-- Name: Products_id_seq; Type: SEQUENCE SET; Schema: public; Owner: pgadmin
--

SELECT pg_catalog.setval('public."Products_id_seq"', 1, true);


--
-- TOC entry 3383 (class 0 OID 0)
-- Dependencies: 214
-- Name: Roles_id_seq; Type: SEQUENCE SET; Schema: public; Owner: pgadmin
--

SELECT pg_catalog.setval('public."Roles_id_seq"', 4, true);


--
-- TOC entry 3384 (class 0 OID 0)
-- Dependencies: 220
-- Name: Users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: pgadmin
--

SELECT pg_catalog.setval('public."Users_id_seq"', 1, true);


--
-- TOC entry 3211 (class 2606 OID 20226)
-- Name: Categories Categories_name_key; Type: CONSTRAINT; Schema: public; Owner: pgadmin
--

ALTER TABLE ONLY public."Categories"
    ADD CONSTRAINT "Categories_name_key" UNIQUE (name);


--
-- TOC entry 3213 (class 2606 OID 20215)
-- Name: Categories Categories_pkey; Type: CONSTRAINT; Schema: public; Owner: pgadmin
--

ALTER TABLE ONLY public."Categories"
    ADD CONSTRAINT "Categories_pkey" PRIMARY KEY (id);


--
-- TOC entry 3207 (class 2606 OID 20228)
-- Name: Products Products_name_key; Type: CONSTRAINT; Schema: public; Owner: pgadmin
--

ALTER TABLE ONLY public."Products"
    ADD CONSTRAINT "Products_name_key" UNIQUE (name);


--
-- TOC entry 3209 (class 2606 OID 20217)
-- Name: Products Products_pkey; Type: CONSTRAINT; Schema: public; Owner: pgadmin
--

ALTER TABLE ONLY public."Products"
    ADD CONSTRAINT "Products_pkey" PRIMARY KEY (id);


--
-- TOC entry 3205 (class 2606 OID 19090)
-- Name: Roles Roles_pkey; Type: CONSTRAINT; Schema: public; Owner: pgadmin
--

ALTER TABLE ONLY public."Roles"
    ADD CONSTRAINT "Roles_pkey" PRIMARY KEY (id);


--
-- TOC entry 3215 (class 2606 OID 20242)
-- Name: Users Users_email_key; Type: CONSTRAINT; Schema: public; Owner: pgadmin
--

ALTER TABLE ONLY public."Users"
    ADD CONSTRAINT "Users_email_key" UNIQUE (email);


--
-- TOC entry 3217 (class 2606 OID 20240)
-- Name: Users Users_pkey; Type: CONSTRAINT; Schema: public; Owner: pgadmin
--

ALTER TABLE ONLY public."Users"
    ADD CONSTRAINT "Users_pkey" PRIMARY KEY (id);


--
-- TOC entry 3218 (class 2606 OID 20253)
-- Name: Products CategoryId; Type: FK CONSTRAINT; Schema: public; Owner: pgadmin
--

ALTER TABLE ONLY public."Products"
    ADD CONSTRAINT "CategoryId" FOREIGN KEY ("CategoryId") REFERENCES public."Categories"(id) NOT VALID;


--
-- TOC entry 3220 (class 2606 OID 20243)
-- Name: Categories UserId; Type: FK CONSTRAINT; Schema: public; Owner: pgadmin
--

ALTER TABLE ONLY public."Categories"
    ADD CONSTRAINT "UserId" FOREIGN KEY ("UserId") REFERENCES public."Users"(id) NOT VALID;


--
-- TOC entry 3219 (class 2606 OID 20248)
-- Name: Products UserId; Type: FK CONSTRAINT; Schema: public; Owner: pgadmin
--

ALTER TABLE ONLY public."Products"
    ADD CONSTRAINT "UserId" FOREIGN KEY ("UserId") REFERENCES public."Users"(id) NOT VALID;


-- Completed on 2023-03-19 15:26:28 CET

--
-- PostgreSQL database dump complete
--

