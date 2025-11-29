SET session_replication_role = replica;

--
-- PostgreSQL database dump
--

-- \restrict zhyxXMvywXGgksdGGSB40cgGvQRCpTTOD81ig1dzOCDE1s0Q6k0fyEuHL0fb2Ne

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
	('00000000-0000-0000-0000-000000000000', 'dc18e6c0-1032-4834-8bf2-0481d297fa7c', 'authenticated', 'authenticated', 'testuser@ucll.be', '$2a$10$eYrjlmWG0ibPqWU.FygV3OAbBWn7xNFHYEi1PZHRP40lAp4zJYP1y', '2025-11-25 11:50:02.683756+00', NULL, '', NULL, '', NULL, '', '', NULL, '2025-11-25 14:59:02.760904+00', '{"provider": "email", "providers": ["email"]}', '{"email_verified": true}', NULL, '2025-11-24 18:04:11.824149+00', '2025-11-25 14:59:02.767129+00', NULL, NULL, '', '', NULL, '', 0, NULL, '', NULL, false, NULL, false),
	('00000000-0000-0000-0000-000000000000', '84e45809-43f5-431c-b7c0-e797e665ab32', 'authenticated', 'authenticated', 'nina.deweerd@student.ucll.be', '$2a$10$WhdNHPOdTuudXGiSQ1ERKeCE0lRZU.qGSi56Q3AMNotPvxfy2NW8S', '2025-11-25 12:19:18.752713+00', NULL, '', NULL, '', NULL, '', '', NULL, NULL, '{"provider": "email", "providers": ["email"]}', '{"email_verified": true}', NULL, '2025-11-25 12:19:18.749394+00', '2025-11-25 12:19:18.754161+00', NULL, NULL, '', '', NULL, '', 0, NULL, '', NULL, false, NULL, false),
	('00000000-0000-0000-0000-000000000000', 'a355b08a-4cf1-48de-850e-cde57fa43eaf', 'authenticated', 'authenticated', 'ashley.timmermans@student.ucll.be', '$2a$10$pvfWSH1CVj3GXVVDgFxvb.p9fsZC7ZfnlyOC8c83ucNT3vk6e.qYm', '2025-11-25 12:20:05.687068+00', NULL, '', NULL, '', NULL, '', '', NULL, NULL, '{"provider": "email", "providers": ["email"]}', '{"email_verified": true}', NULL, '2025-11-25 12:20:05.68457+00', '2025-11-25 12:20:05.687833+00', NULL, NULL, '', '', NULL, '', 0, NULL, '', NULL, false, NULL, false),
	('00000000-0000-0000-0000-000000000000', 'bc2a9a0d-1399-47ca-aa06-8bd8e7dbda69', 'authenticated', 'authenticated', 'odemalfait@student.ucll.be', '$2a$10$GeJDK3hCAywADBpf1bAwq.AZY6SXUgcfAyJCJeZXPPK0dL9yjk7Ti', '2025-11-25 12:12:09.157288+00', NULL, '', NULL, '', NULL, '', '', NULL, '2025-11-29 17:49:38.851967+00', '{"provider": "email", "providers": ["email"]}', '{"email_verified": true}', NULL, '2025-11-25 12:12:09.151356+00', '2025-11-29 17:49:38.865634+00', NULL, NULL, '', '', NULL, '', 0, NULL, '', NULL, false, NULL, false),
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

INSERT INTO "auth"."sessions" ("id", "user_id", "created_at", "updated_at", "factor_id", "aal", "not_after", "refreshed_at", "user_agent", "ip", "tag", "oauth_client_id", "refresh_token_hmac_key", "refresh_token_counter", "scopes") VALUES
	('e650d19b-267d-42e5-a743-6b8a260f1b7b', 'dc18e6c0-1032-4834-8bf2-0481d297fa7c', '2025-11-25 11:50:02.693453+00', '2025-11-25 14:09:41.18907+00', NULL, 'aal1', NULL, '2025-11-25 14:09:41.188964', 'okhttp/4.12.0', '94.224.38.207', NULL, NULL, NULL, NULL, NULL),
	('e18285ed-70fb-4fb0-8a5e-7b59770371f2', 'bc2a9a0d-1399-47ca-aa06-8bd8e7dbda69', '2025-11-25 14:10:04.617181+00', '2025-11-25 14:10:04.617181+00', NULL, 'aal1', NULL, NULL, 'okhttp/4.12.0', '94.224.38.207', NULL, NULL, NULL, NULL, NULL),
	('1c0e3265-3320-416d-8e52-64b9b068f071', 'bc2a9a0d-1399-47ca-aa06-8bd8e7dbda69', '2025-11-25 14:11:54.652078+00', '2025-11-25 14:11:54.652078+00', NULL, 'aal1', NULL, NULL, 'okhttp/4.12.0', '94.224.38.207', NULL, NULL, NULL, NULL, NULL),
	('afbfeea5-f9c3-4738-9511-cb6099393849', 'bc2a9a0d-1399-47ca-aa06-8bd8e7dbda69', '2025-11-25 14:21:58.155104+00', '2025-11-25 14:21:58.155104+00', NULL, 'aal1', NULL, NULL, 'okhttp/4.12.0', '94.224.38.207', NULL, NULL, NULL, NULL, NULL),
	('9b4e25f7-4cb0-4aac-b3d9-dcd97c61e2b2', 'bc2a9a0d-1399-47ca-aa06-8bd8e7dbda69', '2025-11-25 14:34:47.603292+00', '2025-11-25 14:34:47.603292+00', NULL, 'aal1', NULL, NULL, 'okhttp/4.12.0', '94.224.38.207', NULL, NULL, NULL, NULL, NULL),
	('ae31d100-33d5-4726-b49f-9cdacbb116e3', 'dc18e6c0-1032-4834-8bf2-0481d297fa7c', '2025-11-25 14:59:02.760994+00', '2025-11-25 14:59:02.760994+00', NULL, 'aal1', NULL, NULL, 'okhttp/4.12.0', '94.224.38.207', NULL, NULL, NULL, NULL, NULL),
	('402570ee-c37e-487b-b05d-ebbc3bf4c380', 'bc2a9a0d-1399-47ca-aa06-8bd8e7dbda69', '2025-11-25 15:01:31.200214+00', '2025-11-25 15:01:31.200214+00', NULL, 'aal1', NULL, NULL, 'okhttp/4.12.0', '94.224.38.207', NULL, NULL, NULL, NULL, NULL),
	('156572c1-fee3-4cea-b3b3-d23aa25d3c66', 'bc2a9a0d-1399-47ca-aa06-8bd8e7dbda69', '2025-11-25 15:16:43.737245+00', '2025-11-25 15:16:43.737245+00', NULL, 'aal1', NULL, NULL, 'okhttp/4.12.0', '94.224.38.207', NULL, NULL, NULL, NULL, NULL),
	('601a4ef8-2ca4-411e-98ba-c74b591f48eb', 'bc2a9a0d-1399-47ca-aa06-8bd8e7dbda69', '2025-11-25 15:41:33.284486+00', '2025-11-25 15:41:33.284486+00', NULL, 'aal1', NULL, NULL, 'okhttp/4.12.0', '94.224.38.207', NULL, NULL, NULL, NULL, NULL),
	('b1be8bf0-7f0a-45d2-9473-a6d362081535', 'bc2a9a0d-1399-47ca-aa06-8bd8e7dbda69', '2025-11-29 14:14:47.33931+00', '2025-11-29 14:14:47.33931+00', NULL, 'aal1', NULL, NULL, 'okhttp/4.12.0', '94.224.38.207', NULL, NULL, NULL, NULL, NULL),
	('ac52f7a4-4ef2-47b0-82b7-249d4548d2d9', 'bc2a9a0d-1399-47ca-aa06-8bd8e7dbda69', '2025-11-29 14:24:50.151393+00', '2025-11-29 14:24:50.151393+00', NULL, 'aal1', NULL, NULL, 'okhttp/4.12.0', '94.224.38.207', NULL, NULL, NULL, NULL, NULL),
	('1de903d4-580c-43bd-8b7a-a71a761dc281', 'bc2a9a0d-1399-47ca-aa06-8bd8e7dbda69', '2025-11-29 14:28:11.325709+00', '2025-11-29 17:12:24.648645+00', NULL, 'aal1', NULL, '2025-11-29 17:12:24.64852', 'okhttp/4.12.0', '94.224.38.207', NULL, NULL, NULL, NULL, NULL),
	('fe70c519-812f-4019-8b89-5b1e0612440d', 'bc2a9a0d-1399-47ca-aa06-8bd8e7dbda69', '2025-11-29 17:36:45.978057+00', '2025-11-29 17:36:45.978057+00', NULL, 'aal1', NULL, NULL, 'okhttp/4.12.0', '94.224.38.207', NULL, NULL, NULL, NULL, NULL),
	('99c680f2-f6a8-46b8-9cb1-2aec5a4d621e', 'bc2a9a0d-1399-47ca-aa06-8bd8e7dbda69', '2025-11-29 17:49:38.852672+00', '2025-11-29 17:49:38.852672+00', NULL, 'aal1', NULL, NULL, 'okhttp/4.12.0', '94.224.38.207', NULL, NULL, NULL, NULL, NULL);


--
-- Data for Name: mfa_amr_claims; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

INSERT INTO "auth"."mfa_amr_claims" ("session_id", "created_at", "updated_at", "authentication_method", "id") VALUES
	('e650d19b-267d-42e5-a743-6b8a260f1b7b', '2025-11-25 11:50:02.714323+00', '2025-11-25 11:50:02.714323+00', 'password', '11a055e6-cffe-4170-8170-47456d60c442'),
	('e18285ed-70fb-4fb0-8a5e-7b59770371f2', '2025-11-25 14:10:04.623179+00', '2025-11-25 14:10:04.623179+00', 'password', '32e8a554-9c20-4837-8f93-602935af498b'),
	('1c0e3265-3320-416d-8e52-64b9b068f071', '2025-11-25 14:11:54.656747+00', '2025-11-25 14:11:54.656747+00', 'password', 'd08ff2fd-0ff3-4ee7-8272-1c197220c87f'),
	('afbfeea5-f9c3-4738-9511-cb6099393849', '2025-11-25 14:21:58.159888+00', '2025-11-25 14:21:58.159888+00', 'password', 'be0a8f92-cdfe-4b8f-bda0-6116c76d46a3'),
	('9b4e25f7-4cb0-4aac-b3d9-dcd97c61e2b2', '2025-11-25 14:34:47.607264+00', '2025-11-25 14:34:47.607264+00', 'password', '2508931d-db83-474a-b059-3e2c63e08b93'),
	('ae31d100-33d5-4726-b49f-9cdacbb116e3', '2025-11-25 14:59:02.767811+00', '2025-11-25 14:59:02.767811+00', 'password', 'd0abd0ff-18b6-4dfa-a264-8f8301eb47ad'),
	('402570ee-c37e-487b-b05d-ebbc3bf4c380', '2025-11-25 15:01:31.204729+00', '2025-11-25 15:01:31.204729+00', 'password', '5b923df1-0f4c-4cec-9892-e062f9668dbe'),
	('156572c1-fee3-4cea-b3b3-d23aa25d3c66', '2025-11-25 15:16:43.741269+00', '2025-11-25 15:16:43.741269+00', 'password', '814d9f82-ef44-477c-a5ef-fda65ab1b3fa'),
	('601a4ef8-2ca4-411e-98ba-c74b591f48eb', '2025-11-25 15:41:33.288626+00', '2025-11-25 15:41:33.288626+00', 'password', 'cf938bc5-d35e-4263-92c5-5a6ba56d4f3e'),
	('b1be8bf0-7f0a-45d2-9473-a6d362081535', '2025-11-29 14:14:47.394976+00', '2025-11-29 14:14:47.394976+00', 'password', '94973e1e-c1af-48c4-aaf6-b04f6ed7cd43'),
	('ac52f7a4-4ef2-47b0-82b7-249d4548d2d9', '2025-11-29 14:24:50.231056+00', '2025-11-29 14:24:50.231056+00', 'password', '8daa3982-0110-4d28-ab5c-830d6c0e8014'),
	('1de903d4-580c-43bd-8b7a-a71a761dc281', '2025-11-29 14:28:11.332595+00', '2025-11-29 14:28:11.332595+00', 'password', '5b0aae9e-b0cf-4bb9-9829-eae7c7aa9e95'),
	('fe70c519-812f-4019-8b89-5b1e0612440d', '2025-11-29 17:36:46.012362+00', '2025-11-29 17:36:46.012362+00', 'password', '2d1bbd4b-3f28-44fb-8cde-e549b29dc87a'),
	('99c680f2-f6a8-46b8-9cb1-2aec5a4d621e', '2025-11-29 17:49:38.866362+00', '2025-11-29 17:49:38.866362+00', 'password', 'c5c1e31d-3e79-4f6b-876e-7abec1fc81f2');


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
	('00000000-0000-0000-0000-000000000000', 1, 'exfavbzimupi', 'dc18e6c0-1032-4834-8bf2-0481d297fa7c', true, '2025-11-25 11:50:02.707944+00', '2025-11-25 14:09:41.181649+00', NULL, 'e650d19b-267d-42e5-a743-6b8a260f1b7b'),
	('00000000-0000-0000-0000-000000000000', 2, '6ohtsfkfogfn', 'dc18e6c0-1032-4834-8bf2-0481d297fa7c', false, '2025-11-25 14:09:41.183423+00', '2025-11-25 14:09:41.183423+00', 'exfavbzimupi', 'e650d19b-267d-42e5-a743-6b8a260f1b7b'),
	('00000000-0000-0000-0000-000000000000', 3, 'beb5nucr2yp2', 'bc2a9a0d-1399-47ca-aa06-8bd8e7dbda69', false, '2025-11-25 14:10:04.621882+00', '2025-11-25 14:10:04.621882+00', NULL, 'e18285ed-70fb-4fb0-8a5e-7b59770371f2'),
	('00000000-0000-0000-0000-000000000000', 4, 'dy2etp6hgafc', 'bc2a9a0d-1399-47ca-aa06-8bd8e7dbda69', false, '2025-11-25 14:11:54.653779+00', '2025-11-25 14:11:54.653779+00', NULL, '1c0e3265-3320-416d-8e52-64b9b068f071'),
	('00000000-0000-0000-0000-000000000000', 5, 'ibrfsprqrtcp', 'bc2a9a0d-1399-47ca-aa06-8bd8e7dbda69', false, '2025-11-25 14:21:58.156787+00', '2025-11-25 14:21:58.156787+00', NULL, 'afbfeea5-f9c3-4738-9511-cb6099393849'),
	('00000000-0000-0000-0000-000000000000', 6, 'slim6ihfqh4k', 'bc2a9a0d-1399-47ca-aa06-8bd8e7dbda69', false, '2025-11-25 14:34:47.604943+00', '2025-11-25 14:34:47.604943+00', NULL, '9b4e25f7-4cb0-4aac-b3d9-dcd97c61e2b2'),
	('00000000-0000-0000-0000-000000000000', 7, '466oxglq7gr5', 'dc18e6c0-1032-4834-8bf2-0481d297fa7c', false, '2025-11-25 14:59:02.765601+00', '2025-11-25 14:59:02.765601+00', NULL, 'ae31d100-33d5-4726-b49f-9cdacbb116e3'),
	('00000000-0000-0000-0000-000000000000', 8, '4pgqggolxrom', 'bc2a9a0d-1399-47ca-aa06-8bd8e7dbda69', false, '2025-11-25 15:01:31.202209+00', '2025-11-25 15:01:31.202209+00', NULL, '402570ee-c37e-487b-b05d-ebbc3bf4c380'),
	('00000000-0000-0000-0000-000000000000', 9, '4oebobxn7psg', 'bc2a9a0d-1399-47ca-aa06-8bd8e7dbda69', false, '2025-11-25 15:16:43.738974+00', '2025-11-25 15:16:43.738974+00', NULL, '156572c1-fee3-4cea-b3b3-d23aa25d3c66'),
	('00000000-0000-0000-0000-000000000000', 10, 'ykbj3kanmb5b', 'bc2a9a0d-1399-47ca-aa06-8bd8e7dbda69', false, '2025-11-25 15:41:33.286302+00', '2025-11-25 15:41:33.286302+00', NULL, '601a4ef8-2ca4-411e-98ba-c74b591f48eb'),
	('00000000-0000-0000-0000-000000000000', 11, 'zbyjpwxaz7ym', 'bc2a9a0d-1399-47ca-aa06-8bd8e7dbda69', false, '2025-11-29 14:14:47.373978+00', '2025-11-29 14:14:47.373978+00', NULL, 'b1be8bf0-7f0a-45d2-9473-a6d362081535'),
	('00000000-0000-0000-0000-000000000000', 12, '3ugh2bk2aqmy', 'bc2a9a0d-1399-47ca-aa06-8bd8e7dbda69', false, '2025-11-29 14:24:50.197245+00', '2025-11-29 14:24:50.197245+00', NULL, 'ac52f7a4-4ef2-47b0-82b7-249d4548d2d9'),
	('00000000-0000-0000-0000-000000000000', 13, 'qabedxemb6qn', 'bc2a9a0d-1399-47ca-aa06-8bd8e7dbda69', true, '2025-11-29 14:28:11.328638+00', '2025-11-29 15:31:36.995846+00', NULL, '1de903d4-580c-43bd-8b7a-a71a761dc281'),
	('00000000-0000-0000-0000-000000000000', 14, '3qowsyyewsft', 'bc2a9a0d-1399-47ca-aa06-8bd8e7dbda69', true, '2025-11-29 15:31:37.019686+00', '2025-11-29 17:12:24.617488+00', 'qabedxemb6qn', '1de903d4-580c-43bd-8b7a-a71a761dc281'),
	('00000000-0000-0000-0000-000000000000', 15, 'mkykgak3bk22', 'bc2a9a0d-1399-47ca-aa06-8bd8e7dbda69', false, '2025-11-29 17:12:24.629864+00', '2025-11-29 17:12:24.629864+00', '3qowsyyewsft', '1de903d4-580c-43bd-8b7a-a71a761dc281'),
	('00000000-0000-0000-0000-000000000000', 16, '6uuye5drnzy7', 'bc2a9a0d-1399-47ca-aa06-8bd8e7dbda69', false, '2025-11-29 17:36:45.999186+00', '2025-11-29 17:36:45.999186+00', NULL, 'fe70c519-812f-4019-8b89-5b1e0612440d'),
	('00000000-0000-0000-0000-000000000000', 17, 'tsuncldiiz6e', 'bc2a9a0d-1399-47ca-aa06-8bd8e7dbda69', false, '2025-11-29 17:49:38.860983+00', '2025-11-29 17:49:38.860983+00', NULL, '99c680f2-f6a8-46b8-9cb1-2aec5a4d621e');


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
-- Data for Name: medication; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO "public"."medication" ("id", "created_at", "name", "description", "quantity") VALUES
	(1, '2025-11-24 16:00:19.492431+00', 'Antibiotica', '2015-02-02', '10');


--
-- Data for Name: pets; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO "public"."pets" ("id", "created_at", "name", "birthdate", "description", "type", "owner_id") VALUES
	(8, '2025-11-25 13:22:36.844973+00', 'Lena', '2015-04-26', 'Brown Cat', 'Cat', 'bc2a9a0d-1399-47ca-aa06-8bd8e7dbda69'),
	(9, '2025-11-25 13:23:04.783512+00', 'Marieke', '2015-04-26', 'Brown Cat with orange spots', 'Cat', 'bc2a9a0d-1399-47ca-aa06-8bd8e7dbda69'),
	(10, '2025-11-25 13:24:15.983702+00', 'Bengel', '2012-09-22', 'Orange Cat with with spots', 'Cat', '84e45809-43f5-431c-b7c0-e797e665ab32'),
	(11, '2025-11-25 13:25:10.117936+00', 'Pebbles', '2016-04-29', 'Shetland Sheepdog Tricolor, no teeth
', 'Dog', '10ed4022-2da0-4cae-892d-933e6de9c68b'),
	(12, '2025-11-25 13:25:53.364771+00', 'Momo', '2024-06-01', 'White Rabbit with brown spots', 'Rabbit', 'a355b08a-4cf1-48de-850e-cde57fa43eaf'),
	(13, '2025-11-25 13:26:42.676789+00', 'Azula', '2023-01-01', 'White Rabbit with brown and black spots', 'Rabbit', 'a355b08a-4cf1-48de-850e-cde57fa43eaf');


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
-- Data for Name: vaccins; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO "public"."vaccins" ("id", "created_at", "name", "type", "shot_date", "expire_date") VALUES
	(1, '2025-11-24 17:08:14.291203+00', 'Anti-wormen', 'A', '2012-12-12', '2022-12-12'),
	(2, '2025-11-24 17:08:46.107365+00', 'Rabies', 'A', '2012-12-12', '2022-12-12'),
	(3, '2025-11-24 17:09:22.891928+00', 'Anti-vlooien', 'B', '2012-12-12', '2022-12-12');


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
-- Data for Name: weight; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO "public"."weight" ("id", "created_at", "value", "date") VALUES
	(1, '2025-11-24 16:36:32.768974+00', '1,5 kg', '2025-10-11'),
	(2, '2025-11-24 16:36:55.822753+00', '4', '2025-11-11'),
	(3, '2025-11-24 17:13:48.214928+00', '5 kg', '2025-11-24');


--
-- Data for Name: pets_weight; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO "public"."pets_weight" ("pet_id", "weight_id") VALUES
	(8, 3),
	(9, 2),
	(12, 1);


--
-- Data for Name: user_information; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO "public"."user_information" ("id", "created_at", "first_name", "last_name", "auth_user_id", "phonenumber", "email") VALUES
	(5, '2025-11-25 12:24:14.50874+00', 'Ode', 'Malfait', 'bc2a9a0d-1399-47ca-aa06-8bd8e7dbda69', NULL, NULL),
	(6, '2025-11-25 12:24:43.388426+00', 'Lotte', 'Geeraerts', '10ed4022-2da0-4cae-892d-933e6de9c68b', NULL, NULL),
	(7, '2025-11-25 12:25:21.143581+00', 'Nina', 'de Weerd', '84e45809-43f5-431c-b7c0-e797e665ab32', NULL, NULL),
	(8, '2025-11-25 12:25:44.871848+00', 'Ashley', 'Timmermans', 'a355b08a-4cf1-48de-850e-cde57fa43eaf', NULL, NULL),
	(9, '2025-11-25 12:26:02.66372+00', 'Test', 'User', 'dc18e6c0-1032-4834-8bf2-0481d297fa7c', NULL, NULL);


--
-- Data for Name: profiles; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO "public"."profiles" ("id", "created_at", "pictures", "user_id") VALUES
	(5, '2025-11-25 12:26:34.624415+00', NULL, 'bc2a9a0d-1399-47ca-aa06-8bd8e7dbda69'),
	(6, '2025-11-25 12:26:45.621389+00', NULL, '10ed4022-2da0-4cae-892d-933e6de9c68b'),
	(7, '2025-11-25 12:26:53.885016+00', NULL, '84e45809-43f5-431c-b7c0-e797e665ab32'),
	(8, '2025-11-25 12:27:05.068637+00', NULL, 'a355b08a-4cf1-48de-850e-cde57fa43eaf'),
	(9, '2025-11-25 12:27:14.146894+00', NULL, 'dc18e6c0-1032-4834-8bf2-0481d297fa7c');


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

SELECT pg_catalog.setval('"auth"."refresh_tokens_id_seq"', 17, true);


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

-- \unrestrict zhyxXMvywXGgksdGGSB40cgGvQRCpTTOD81ig1dzOCDE1s0Q6k0fyEuHL0fb2Ne

RESET ALL;
