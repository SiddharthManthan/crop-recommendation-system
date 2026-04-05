--
-- PostgreSQL database cluster dump
--

\restrict JVMfKliw3FLkVj0fvwRkCx85JY3F0fKSM3ZefKqpB6lQp1fPfux4V3A29ud8lmk

SET default_transaction_read_only = off;

SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;

--
-- Roles
--

CREATE ROLE postgres;
ALTER ROLE postgres WITH SUPERUSER INHERIT CREATEROLE CREATEDB LOGIN REPLICATION BYPASSRLS PASSWORD 'SCRAM-SHA-256$4096:c66GMiqRF6KiQgUGmzDVsw==$eRDeKrUk1iZ6ObOjAevBm+kXuMn+Yo/8rT2b+1FQs5E=:7LGnsp9GPEHOZvA9sA12VjURHuk3c/nNfPoHCy7FfZk=';

--
-- User Configurations
--








\unrestrict JVMfKliw3FLkVj0fvwRkCx85JY3F0fKSM3ZefKqpB6lQp1fPfux4V3A29ud8lmk

--
-- Databases
--

--
-- Database "template1" dump
--

\connect template1

--
-- PostgreSQL database dump
--

\restrict 3iQlXCU3zRn6ZGC5AQ6vO8ltwjXQErRHQoma7xnw59PfTCGil7fmTPRYfuvXBvU

-- Dumped from database version 15.17 (Debian 15.17-1.pgdg13+1)
-- Dumped by pg_dump version 15.17 (Debian 15.17-1.pgdg13+1)

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
-- PostgreSQL database dump complete
--

\unrestrict 3iQlXCU3zRn6ZGC5AQ6vO8ltwjXQErRHQoma7xnw59PfTCGil7fmTPRYfuvXBvU

--
-- Database "crop_recommendation" dump
--

--
-- PostgreSQL database dump
--

\restrict wrvCYqZTjOglL2CcRyEr6gTPYWvUM9UhhhvWtbW5YnQCzNRtlyocbOe5RyiJ5Vi

-- Dumped from database version 15.17 (Debian 15.17-1.pgdg13+1)
-- Dumped by pg_dump version 15.17 (Debian 15.17-1.pgdg13+1)

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
-- Name: crop_recommendation; Type: DATABASE; Schema: -; Owner: postgres
--

CREATE DATABASE crop_recommendation WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'en_US.utf8';


ALTER DATABASE crop_recommendation OWNER TO postgres;

\unrestrict wrvCYqZTjOglL2CcRyEr6gTPYWvUM9UhhhvWtbW5YnQCzNRtlyocbOe5RyiJ5Vi
\connect crop_recommendation
\restrict wrvCYqZTjOglL2CcRyEr6gTPYWvUM9UhhhvWtbW5YnQCzNRtlyocbOe5RyiJ5Vi

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

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: Crop; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Crop" (
    id integer NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL,
    "cropName" character varying(255) NOT NULL,
    "cropDuration" integer NOT NULL,
    "waterRequirement" integer NOT NULL,
    "numberOfIrrigation" integer NOT NULL
);


ALTER TABLE public."Crop" OWNER TO postgres;

--
-- Name: Crop_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."Crop_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."Crop_id_seq" OWNER TO postgres;

--
-- Name: Crop_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."Crop_id_seq" OWNED BY public."Crop".id;


--
-- Name: District; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."District" (
    id integer NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL,
    name character varying(255) NOT NULL,
    storage numeric NOT NULL,
    "stateId" integer NOT NULL
);


ALTER TABLE public."District" OWNER TO postgres;

--
-- Name: District_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."District_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."District_id_seq" OWNER TO postgres;

--
-- Name: District_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."District_id_seq" OWNED BY public."District".id;


--
-- Name: Farm; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Farm" (
    id integer NOT NULL,
    "districtId" integer NOT NULL,
    area integer NOT NULL,
    planted boolean DEFAULT false NOT NULL,
    "plantedArea" integer,
    "plantedDate" date,
    "cropId" integer,
    "userId" character varying(255) NOT NULL
);


ALTER TABLE public."Farm" OWNER TO postgres;

--
-- Name: Farm_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."Farm_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."Farm_id_seq" OWNER TO postgres;

--
-- Name: Farm_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."Farm_id_seq" OWNED BY public."Farm".id;


--
-- Name: Notification; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Notification" (
    id integer NOT NULL,
    "userType" integer NOT NULL,
    "districtId" integer NOT NULL,
    "daysTillExhaustion" integer,
    "updatedAt" timestamp(3) without time zone NOT NULL,
    dismissed boolean DEFAULT false NOT NULL
);


ALTER TABLE public."Notification" OWNER TO postgres;

--
-- Name: Notification_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."Notification_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."Notification_id_seq" OWNER TO postgres;

--
-- Name: Notification_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."Notification_id_seq" OWNED BY public."Notification".id;


--
-- Name: State; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."State" (
    id integer NOT NULL,
    name character varying(255) NOT NULL
);


ALTER TABLE public."State" OWNER TO postgres;

--
-- Name: State_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."State_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."State_id_seq" OWNER TO postgres;

--
-- Name: State_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."State_id_seq" OWNED BY public."State".id;


--
-- Name: _prisma_migrations; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public._prisma_migrations (
    id character varying(36) NOT NULL,
    checksum character varying(64) NOT NULL,
    finished_at timestamp with time zone,
    migration_name character varying(255) NOT NULL,
    logs text,
    rolled_back_at timestamp with time zone,
    started_at timestamp with time zone DEFAULT now() NOT NULL,
    applied_steps_count integer DEFAULT 0 NOT NULL
);


ALTER TABLE public._prisma_migrations OWNER TO postgres;

--
-- Name: Crop id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Crop" ALTER COLUMN id SET DEFAULT nextval('public."Crop_id_seq"'::regclass);


--
-- Name: District id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."District" ALTER COLUMN id SET DEFAULT nextval('public."District_id_seq"'::regclass);


--
-- Name: Farm id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Farm" ALTER COLUMN id SET DEFAULT nextval('public."Farm_id_seq"'::regclass);


--
-- Name: Notification id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Notification" ALTER COLUMN id SET DEFAULT nextval('public."Notification_id_seq"'::regclass);


--
-- Name: State id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."State" ALTER COLUMN id SET DEFAULT nextval('public."State_id_seq"'::regclass);


--
-- Data for Name: Crop; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Crop" (id, "updatedAt", "cropName", "cropDuration", "waterRequirement", "numberOfIrrigation") FROM stdin;
1	2025-12-25 15:53:09.214	Rice	135	1250	18
2	2025-12-25 15:53:09.214	Groundnut	105	550	10
3	2025-12-25 15:53:09.215	Maize	110	500	8
4	2025-12-25 15:53:09.214	Sorghum	100	350	6
5	2025-12-25 15:53:09.215	Sugarcane	365	2000	24
6	2025-12-25 15:53:09.215	Ragi	100	350	6
7	2025-12-25 15:53:09.215	Cotton	165	550	11
8	2025-12-25 15:53:09.215	Pulses	65	350	4
\.


--
-- Data for Name: District; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."District" (id, "updatedAt", name, storage, "stateId") FROM stdin;
1	2025-12-25 15:53:09.182	Ahmadabad	0.02	0
2	2025-12-25 15:53:09.192	Arvalli	0.25	0
3	2025-12-25 15:53:09.187	Amreli	0.07	0
4	2025-12-25 15:53:09.196	Bharuch	0	0
5	2025-12-25 15:53:09.213	Bhavnagar	0.51	0
6	2025-12-25 15:53:09.192	Banas Kantha	0.51	0
7	2025-12-25 15:53:09.213	Chhotaudepur	0.17	0
8	2025-12-25 15:53:09.213	Botad	0.03	0
9	2025-12-25 15:53:09.213	Devbhumi Dwarka	0.03	0
10	2025-12-25 15:53:09.213	Dohad	0.06	0
11	2025-12-25 15:53:09.213	Gir Somnath	0.06	0
12	2025-12-25 15:53:09.213	Jamnagar	0.2	0
13	2025-12-25 15:53:09.213	Junagadh	0.17	0
14	2025-12-25 15:53:09.213	Kachchh	0.15	0
15	2025-12-25 15:53:09.213	Kheda	0	0
16	2025-12-25 15:53:09.213	Mahesana	0.55	0
17	2025-12-25 15:53:09.213	Mahisagar	1.23	0
18	2025-12-25 15:53:09.214	Morbi	0.26	0
19	2025-12-25 15:53:09.214	Narmada	4.06	0
20	2025-12-25 15:53:09.214	Navsari	0.03	0
21	2025-12-25 15:53:09.214	Panch Mahals	0.29	0
22	2025-12-25 15:53:09.214	Porbandar	0.04	0
23	2025-12-25 15:53:09.214	Sabar Kantha	0.58	0
24	2025-12-25 15:53:09.214	Rajkot	0.3	0
25	2025-12-25 15:53:09.214	Surat	0.03	0
26	2025-12-25 15:53:09.214	Tapi	10.15	0
27	2025-12-25 15:53:09.214	Surendranagar	0.04	0
28	2025-12-25 15:53:09.215	Valsad	0.59	0
\.


--
-- Data for Name: Farm; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Farm" (id, "districtId", area, planted, "plantedArea", "plantedDate", "cropId", "userId") FROM stdin;
1	1	55	t	55	2025-12-09	1	694d5e16b81025319ce528ae
\.


--
-- Data for Name: Notification; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Notification" (id, "userType", "districtId", "daysTillExhaustion", "updatedAt", dismissed) FROM stdin;
\.


--
-- Data for Name: State; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."State" (id, name) FROM stdin;
0	Gujarat
\.


--
-- Data for Name: _prisma_migrations; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public._prisma_migrations (id, checksum, finished_at, migration_name, logs, rolled_back_at, started_at, applied_steps_count) FROM stdin;
79b98b4b-d0dd-4a13-b1b2-35282db2e19f	999be1b3f22051058fb22a9023318af151a9a8a334855f977bce6b772efe7059	2025-12-25 15:52:55.644564+00	20250522162335_init	\N	\N	2025-12-25 15:52:55.628536+00	1
\.


--
-- Name: Crop_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Crop_id_seq"', 8, true);


--
-- Name: District_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."District_id_seq"', 28, true);


--
-- Name: Farm_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Farm_id_seq"', 1, true);


--
-- Name: Notification_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Notification_id_seq"', 1, false);


--
-- Name: State_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."State_id_seq"', 1, false);


--
-- Name: Crop Crop_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Crop"
    ADD CONSTRAINT "Crop_pkey" PRIMARY KEY (id);


--
-- Name: District District_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."District"
    ADD CONSTRAINT "District_pkey" PRIMARY KEY (id);


--
-- Name: Farm Farm_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Farm"
    ADD CONSTRAINT "Farm_pkey" PRIMARY KEY (id);


--
-- Name: Notification Notification_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Notification"
    ADD CONSTRAINT "Notification_pkey" PRIMARY KEY (id);


--
-- Name: State State_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."State"
    ADD CONSTRAINT "State_pkey" PRIMARY KEY (id);


--
-- Name: _prisma_migrations _prisma_migrations_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public._prisma_migrations
    ADD CONSTRAINT _prisma_migrations_pkey PRIMARY KEY (id);


--
-- Name: District District_stateId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."District"
    ADD CONSTRAINT "District_stateId_fkey" FOREIGN KEY ("stateId") REFERENCES public."State"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: Farm Farm_cropId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Farm"
    ADD CONSTRAINT "Farm_cropId_fkey" FOREIGN KEY ("cropId") REFERENCES public."Crop"(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: Farm Farm_districtId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Farm"
    ADD CONSTRAINT "Farm_districtId_fkey" FOREIGN KEY ("districtId") REFERENCES public."District"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: Notification Notification_districtId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Notification"
    ADD CONSTRAINT "Notification_districtId_fkey" FOREIGN KEY ("districtId") REFERENCES public."District"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- PostgreSQL database dump complete
--

\unrestrict wrvCYqZTjOglL2CcRyEr6gTPYWvUM9UhhhvWtbW5YnQCzNRtlyocbOe5RyiJ5Vi

--
-- Database "postgres" dump
--

\connect postgres

--
-- PostgreSQL database dump
--

\restrict ucWq3nbgXCgEnVqCkQqCaA4axeHt17d5ok5reAo5hwYqkCmZ81tJgIQv6dvWHT9

-- Dumped from database version 15.17 (Debian 15.17-1.pgdg13+1)
-- Dumped by pg_dump version 15.17 (Debian 15.17-1.pgdg13+1)

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
-- PostgreSQL database dump complete
--

\unrestrict ucWq3nbgXCgEnVqCkQqCaA4axeHt17d5ok5reAo5hwYqkCmZ81tJgIQv6dvWHT9

--
-- PostgreSQL database cluster dump complete
--

