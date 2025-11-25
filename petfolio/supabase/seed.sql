SET session_replication_role = replica;

--
-- PostgreSQL database dump
--

-- \restrict hKahjP1afcKr4exwy0v1tjU0BC9O8ZNHO9abO7NuBFFgtn1GnvlkwN56vVVn5Ae

-- Dumped from database version 17.6
-- Dumped by pg_dump version 17.6

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Data for Name: audit_log_entries; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: flow_state; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: users; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

INSERT INTO "auth"."users" ("instance_id", "id", "aud", "role", "email", "encrypted_password", "email_confirmed_at", "invited_at", "confirmation_token", "confirmation_sent_at", "recovery_token", "recovery_sent_at", "email_change_token_new", "email_change", "email_change_sent_at", "last_sign_in_at", "raw_app_meta_data", "raw_user_meta_data", "is_super_admin", "created_at", "updated_at", "phone", "phone_confirmed_at", "phone_change", "phone_change_token", "phone_change_sent_at", "email_change_token_current", "email_change_confirm_status", "banned_until", "reauthentication_token", "reauthentication_sent_at", "is_sso_user", "deleted_at", "is_anonymous") VALUES
	('00000000-0000-0000-0000-000000000000', 'dc18e6c0-1032-4834-8bf2-0481d297fa7c', 'authenticated', 'authenticated', 'testuser@ucll.be', '$2a$10$eYrjlmWG0ibPqWU.FygV3OAbBWn7xNFHYEi1PZHRP40lAp4zJYP1y', '2025-11-25 11:50:02.683756+00', NULL, '', NULL, '', NULL, '', '', NULL, '2025-11-25 11:50:02.692683+00', '{"provider": "email", "providers": ["email"]}', '{"email_verified": true}', NULL, '2025-11-24 18:04:11.824149+00', '2025-11-25 11:50:02.713787+00', NULL, NULL, '', '', NULL, '', 0, NULL, '', NULL, false, NULL, false),
	('00000000-0000-0000-0000-000000000000', 'bc2a9a0d-1399-47ca-aa06-8bd8e7dbda69', 'authenticated', 'authenticated', 'odemalfait@student.ucll.be', '$2a$10$GeJDK3hCAywADBpf1bAwq.AZY6SXUgcfAyJCJeZXPPK0dL9yjk7Ti', '2025-11-25 12:12:09.157288+00', NULL, '', NULL, '', NULL, '', '', NULL, NULL, '{"provider": "email", "providers": ["email"]}', '{"email_verified": true}', NULL, '2025-11-25 12:12:09.151356+00', '2025-11-25 12:12:09.158242+00', NULL, NULL, '', '', NULL, '', 0, NULL, '', NULL, false, NULL, false),
	('00000000-0000-0000-0000-000000000000', '84e45809-43f5-431c-b7c0-e797e665ab32', 'authenticated', 'authenticated', 'nina.deweerd@student.ucll.be', '$2a$10$WhdNHPOdTuudXGiSQ1ERKeCE0lRZU.qGSi56Q3AMNotPvxfy2NW8S', '2025-11-25 12:19:18.752713+00', NULL, '', NULL, '', NULL, '', '', NULL, NULL, '{"provider": "email", "providers": ["email"]}', '{"email_verified": true}', NULL, '2025-11-25 12:19:18.749394+00', '2025-11-25 12:19:18.754161+00', NULL, NULL, '', '', NULL, '', 0, NULL, '', NULL, false, NULL, false),
	('00000000-0000-0000-0000-000000000000', 'a355b08a-4cf1-48de-850e-cde57fa43eaf', 'authenticated', 'authenticated', 'ashley.timmermans@student.ucll.be', '$2a$10$pvfWSH1CVj3GXVVDgFxvb.p9fsZC7ZfnlyOC8c83ucNT3vk6e.qYm', '2025-11-25 12:20:05.687068+00', NULL, '', NULL, '', NULL, '', '', NULL, NULL, '{"provider": "email", "providers": ["email"]}', '{"email_verified": true}', NULL, '2025-11-25 12:20:05.68457+00', '2025-11-25 12:20:05.687833+00', NULL, NULL, '', '', NULL, '', 0, NULL, '', NULL, false, NULL, false),
	('00000000-0000-0000-0000-000000000000', '10ed4022-2da0-4cae-892d-933e6de9c68b', 'authenticated', 'authenticated', 'lotte.geeraerts@ucll.be', '$2a$10$9Qkrv3FjjeaBUaZDrl4zt.wq5PODfAQ8mnyLINf5SCc1.6FO5Zitq', '2025-11-25 12:20:36.114919+00', NULL, '', NULL, '', NULL, '', '', NULL, NULL, '{"provider": "email", "providers": ["email"]}', '{"email_verified": true}', NULL, '2025-11-25 12:20:36.112399+00', '2025-11-25 12:20:36.11632+00', NULL, NULL, '', '', NULL, '', 0, NULL, '', NULL, false, NULL, false);


--
-- Data for Name: identities; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

INSERT INTO "auth"."identities" ("provider_id", "user_id", "identity_data", "provider", "last_sign_in_at", "created_at", "updated_at", "id") VALUES
	('dc18e6c0-1032-4834-8bf2-0481d297fa7c', 'dc18e6c0-1032-4834-8bf2-0481d297fa7c', '{"sub": "dc18e6c0-1032-4834-8bf2-0481d297fa7c", "email": "testuser@ucll.be", "email_verified": false, "phone_verified": false}', 'email', '2025-11-24 18:04:11.831407+00', '2025-11-24 18:04:11.831468+00', '2025-11-24 18:04:11.831468+00', 'd0f6824c-9453-4485-a3f2-6dfae8257d9b'),
	('bc2a9a0d-1399-47ca-aa06-8bd8e7dbda69', 'bc2a9a0d-1399-47ca-aa06-8bd8e7dbda69', '{"sub": "bc2a9a0d-1399-47ca-aa06-8bd8e7dbda69", "email": "odemalfait@student.ucll.be", "email_verified": false, "phone_verified": false}', 'email', '2025-11-25 12:12:09.15505+00', '2025-11-25 12:12:09.155119+00', '2025-11-25 12:12:09.155119+00', '40972bdb-b627-4d78-a2b3-b77ba67cb120'),
	('84e45809-43f5-431c-b7c0-e797e665ab32', '84e45809-43f5-431c-b7c0-e797e665ab32', '{"sub": "84e45809-43f5-431c-b7c0-e797e665ab32", "email": "nina.deweerd@student.ucll.be", "email_verified": false, "phone_verified": false}', 'email', '2025-11-25 12:19:18.750806+00', '2025-11-25 12:19:18.750875+00', '2025-11-25 12:19:18.750875+00', 'd92079fd-5d38-4be0-b845-d05f8e8904fd'),
	('a355b08a-4cf1-48de-850e-cde57fa43eaf', 'a355b08a-4cf1-48de-850e-cde57fa43eaf', '{"sub": "a355b08a-4cf1-48de-850e-cde57fa43eaf", "email": "ashley.timmermans@student.ucll.be", "email_verified": false, "phone_verified": false}', 'email', '2025-11-25 12:20:05.685648+00', '2025-11-25 12:20:05.685698+00', '2025-11-25 12:20:05.685698+00', '3dc4541f-c702-4624-84d3-9059b5449f67'),
	('10ed4022-2da0-4cae-892d-933e6de9c68b', '10ed4022-2da0-4cae-892d-933e6de9c68b', '{"sub": "10ed4022-2da0-4cae-892d-933e6de9c68b", "email": "lotte.geeraerts@ucll.be", "email_verified": false, "phone_verified": false}', 'email', '2025-11-25 12:20:36.11341+00', '2025-11-25 12:20:36.11346+00', '2025-11-25 12:20:36.11346+00', '1867f650-fbd9-4ca5-a42b-04919c120945');


--
-- Data for Name: instances; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: oauth_clients; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: sessions; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

INSERT INTO "auth"."sessions" ("id", "user_id", "created_at", "updated_at", "factor_id", "aal", "not_after", "refreshed_at", "user_agent", "ip", "tag", "oauth_client_id", "refresh_token_hmac_key", "refresh_token_counter") VALUES
	('e650d19b-267d-42e5-a743-6b8a260f1b7b', 'dc18e6c0-1032-4834-8bf2-0481d297fa7c', '2025-11-25 11:50:02.693453+00', '2025-11-25 11:50:02.693453+00', NULL, 'aal1', NULL, NULL, 'okhttp/4.12.0', '94.224.38.207', NULL, NULL, NULL, NULL);


--
-- Data for Name: mfa_amr_claims; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

INSERT INTO "auth"."mfa_amr_claims" ("session_id", "created_at", "updated_at", "authentication_method", "id") VALUES
	('e650d19b-267d-42e5-a743-6b8a260f1b7b', '2025-11-25 11:50:02.714323+00', '2025-11-25 11:50:02.714323+00', 'password', '11a055e6-cffe-4170-8170-47456d60c442');


--
-- Data for Name: mfa_factors; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: mfa_challenges; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: oauth_authorizations; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: oauth_consents; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: one_time_tokens; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: refresh_tokens; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

INSERT INTO "auth"."refresh_tokens" ("instance_id", "id", "token", "user_id", "revoked", "created_at", "updated_at", "parent", "session_id") VALUES
	('00000000-0000-0000-0000-000000000000', 1, 'exfavbzimupi', 'dc18e6c0-1032-4834-8bf2-0481d297fa7c', false, '2025-11-25 11:50:02.707944+00', '2025-11-25 11:50:02.707944+00', NULL, 'e650d19b-267d-42e5-a743-6b8a260f1b7b');


--
-- Data for Name: sso_providers; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: saml_providers; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: saml_relay_states; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: sso_domains; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: Medication; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO "public"."Medication" ("id", "created_at", "name", "description", "quantity") VALUES
	(1, '2025-11-24 16:00:19.492431+00', 'Antibiotica', '2015-02-02', '10');


--
-- Data for Name: User Information; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO "public"."User Information" ("id", "created_at", "first_name", "last_name", "auth_user_id", "phonenumber", "email") VALUES
	(5, '2025-11-25 12:24:14.50874+00', 'Ode', 'Malfait', 'bc2a9a0d-1399-47ca-aa06-8bd8e7dbda69', NULL, NULL),
	(6, '2025-11-25 12:24:43.388426+00', 'Lotte', 'Geeraerts', '10ed4022-2da0-4cae-892d-933e6de9c68b', NULL, NULL),
	(7, '2025-11-25 12:25:21.143581+00', 'Nina', 'de Weerd', '84e45809-43f5-431c-b7c0-e797e665ab32', NULL, NULL),
	(8, '2025-11-25 12:25:44.871848+00', 'Ashley', 'Timmermans', 'a355b08a-4cf1-48de-850e-cde57fa43eaf', NULL, NULL),
	(9, '2025-11-25 12:26:02.66372+00', 'Test', 'User', 'dc18e6c0-1032-4834-8bf2-0481d297fa7c', NULL, NULL);


--
-- Data for Name: Pets; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO "public"."Pets" ("id", "created_at", "name", "birthdate", "description", "type", "owner_id") VALUES
	(8, '2025-11-25 13:22:36.844973+00', 'Lena', '2015-04-26', 'Brown Cat', 'Cat', 'bc2a9a0d-1399-47ca-aa06-8bd8e7dbda69'),
	(9, '2025-11-25 13:23:04.783512+00', 'Marieke', '2015-04-26', 'Brown Cat with orange spots', 'Cat', 'bc2a9a0d-1399-47ca-aa06-8bd8e7dbda69'),
	(10, '2025-11-25 13:24:15.983702+00', 'Bengel', '2012-09-22', 'Orange Cat with with spots', 'Cat', '84e45809-43f5-431c-b7c0-e797e665ab32'),
	(11, '2025-11-25 13:25:10.117936+00', 'Pebbles', '2016-04-29', 'Shetland Sheepdog Tricolor, no teeth
', 'Dog', '10ed4022-2da0-4cae-892d-933e6de9c68b'),
	(12, '2025-11-25 13:25:53.364771+00', 'Momo', '2024-06-01', 'White Rabbit with brown spots', 'Rabbit', 'a355b08a-4cf1-48de-850e-cde57fa43eaf'),
	(13, '2025-11-25 13:26:42.676789+00', 'Azula', '2023-01-01', 'White Rabbit with brown and black spots', 'Rabbit', 'a355b08a-4cf1-48de-850e-cde57fa43eaf');


--
-- Data for Name: Profiles; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO "public"."Profiles" ("id", "created_at", "user_id", "pictures") VALUES
	(5, '2025-11-25 12:26:34.624415+00', 5, NULL),
	(6, '2025-11-25 12:26:45.621389+00', 6, NULL),
	(7, '2025-11-25 12:26:53.885016+00', 7, NULL),
	(8, '2025-11-25 12:27:05.068637+00', 8, NULL),
	(9, '2025-11-25 12:27:14.146894+00', 9, NULL);


--
-- Data for Name: Vaccins; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO "public"."Vaccins" ("id", "created_at", "name", "type", "shot_date", "expire_date") VALUES
	(1, '2025-11-24 17:08:14.291203+00', 'Anti-wormen', 'A', '2012-12-12', '2022-12-12'),
	(2, '2025-11-24 17:08:46.107365+00', 'Rabies', 'A', '2012-12-12', '2022-12-12'),
	(3, '2025-11-24 17:09:22.891928+00', 'Anti-vlooien', 'B', '2012-12-12', '2022-12-12');


--
-- Data for Name: Weight; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO "public"."Weight" ("id", "created_at", "value", "date") VALUES
	(1, '2025-11-24 16:36:32.768974+00', '1,5 kg', '2025-10-11'),
	(2, '2025-11-24 16:36:55.822753+00', '4', '2025-11-11'),
	(3, '2025-11-24 17:13:48.214928+00', '5 kg', '2025-11-24');


--
-- Data for Name: pets_medication; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO "public"."pets_medication" ("pet_id", "medication_id") VALUES
	(8, 1),
	(9, 1),
	(10, 1),
	(11, 1),
	(12, 1),
	(13, 1);


--
-- Data for Name: pets_vaccin; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO "public"."pets_vaccin" ("pet_id", "vaccin_id") VALUES
	(8, 1),
	(9, 1),
	(10, 1),
	(11, 1),
	(12, 1),
	(13, 1);


--
-- Data for Name: pets_weight; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO "public"."pets_weight" ("pet_id", "weight_id") VALUES
	(8, 3),
	(9, 2),
	(12, 1);


--
-- Data for Name: buckets; Type: TABLE DATA; Schema: storage; Owner: supabase_storage_admin
--



--
-- Data for Name: buckets_analytics; Type: TABLE DATA; Schema: storage; Owner: supabase_storage_admin
--



--
-- Data for Name: buckets_vectors; Type: TABLE DATA; Schema: storage; Owner: supabase_storage_admin
--



--
-- Data for Name: objects; Type: TABLE DATA; Schema: storage; Owner: supabase_storage_admin
--



--
-- Data for Name: prefixes; Type: TABLE DATA; Schema: storage; Owner: supabase_storage_admin
--



--
-- Data for Name: s3_multipart_uploads; Type: TABLE DATA; Schema: storage; Owner: supabase_storage_admin
--



--
-- Data for Name: s3_multipart_uploads_parts; Type: TABLE DATA; Schema: storage; Owner: supabase_storage_admin
--



--
-- Data for Name: vector_indexes; Type: TABLE DATA; Schema: storage; Owner: supabase_storage_admin
--



--
-- Name: refresh_tokens_id_seq; Type: SEQUENCE SET; Schema: auth; Owner: supabase_auth_admin
--

SELECT pg_catalog.setval('"auth"."refresh_tokens_id_seq"', 1, true);


--
-- Name: Medication_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('"public"."Medication_id_seq"', 1, true);


--
-- Name: Pets_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('"public"."Pets_id_seq"', 13, true);


--
-- Name: Profiles_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('"public"."Profiles_id_seq"', 9, true);


--
-- Name: Users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('"public"."Users_id_seq"', 9, true);


--
-- Name: Vaccins_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('"public"."Vaccins_id_seq"', 3, true);


--
-- Name: Weight_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('"public"."Weight_id_seq"', 3, true);


--
-- PostgreSQL database dump complete
--

-- \unrestrict hKahjP1afcKr4exwy0v1tjU0BC9O8ZNHO9abO7NuBFFgtn1GnvlkwN56vVVn5Ae

RESET ALL;
