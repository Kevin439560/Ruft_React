PGDMP                      {            RUFT    16.0    16.0 &    �           0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                      false            �           0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                      false            �           0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                      false            �           1262    16398    RUFT    DATABASE     }   CREATE DATABASE "RUFT" WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'Portuguese_Brazil.1252';
    DROP DATABASE "RUFT";
                postgres    false            �           0    0    DATABASE "RUFT"    COMMENT     K   COMMENT ON DATABASE "RUFT" IS 'Banco de Dados utilizado para o site RUFT';
                   postgres    false    4833            �            1259    16400    ENDERECO    TABLE     �   CREATE TABLE public."ENDERECO" (
    "ID" integer NOT NULL,
    "RUA" character varying,
    "CIDADE" character varying,
    "COMPL" character varying,
    "CEP" character(9),
    "NUM" integer
);
    DROP TABLE public."ENDERECO";
       public         heap    postgres    false            �           0    0    TABLE "ENDERECO"    COMMENT     U   COMMENT ON TABLE public."ENDERECO" IS 'Tabela que armazena endereços dos usuarios';
          public          postgres    false    216            �            1259    16399    ENDERECO_ID_seq    SEQUENCE     �   ALTER TABLE public."ENDERECO" ALTER COLUMN "ID" ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public."ENDERECO_ID_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);
            public          postgres    false    216            �            1259    16447    FAVORITO    TABLE     ^   CREATE TABLE public."FAVORITO" (
    "UID" integer NOT NULL,
    "ITEMID" integer NOT NULL
);
    DROP TABLE public."FAVORITO";
       public         heap    postgres    false            �            1259    16462 
   ITEMPEDIDO    TABLE     �   CREATE TABLE public."ITEMPEDIDO" (
    "PEDIDOID" integer NOT NULL,
    "ITEMID" integer NOT NULL,
    "QUANTT" integer NOT NULL
);
     DROP TABLE public."ITEMPEDIDO";
       public         heap    postgres    false            �            1259    16440    MENU    TABLE       CREATE TABLE public."MENU" (
    "ID" integer NOT NULL,
    "NOME" character varying(60) NOT NULL,
    "DESCRICAO" character varying(150) NOT NULL,
    "VALOR" numeric NOT NULL,
    "CATEGORIA" character varying(30) NOT NULL,
    "IMAGEM" character varying(30) NOT NULL
);
    DROP TABLE public."MENU";
       public         heap    postgres    false            �            1259    16439    MENU_ID_seq    SEQUENCE     �   ALTER TABLE public."MENU" ALTER COLUMN "ID" ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public."MENU_ID_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);
            public          postgres    false    222            �            1259    16427    PEDIDO    TABLE     v   CREATE TABLE public."PEDIDO" (
    "ID" integer NOT NULL,
    "UID" integer NOT NULL,
    "VALOR" numeric NOT NULL
);
    DROP TABLE public."PEDIDO";
       public         heap    postgres    false            �            1259    16426    PEDIDO_ID_seq    SEQUENCE     �   ALTER TABLE public."PEDIDO" ALTER COLUMN "ID" ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public."PEDIDO_ID_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);
            public          postgres    false    220            �            1259    16414    USUARIO    TABLE     	  CREATE TABLE public."USUARIO" (
    "ID" integer NOT NULL,
    "UNOME" character varying(30) NOT NULL,
    "UEMAIL" character varying(255) NOT NULL,
    "UPASS" character varying NOT NULL,
    "ENDID" integer NOT NULL,
    "PHONE" character varying(14) NOT NULL
);
    DROP TABLE public."USUARIO";
       public         heap    postgres    false            �            1259    16413    USUARIO_UID_seq    SEQUENCE     �   ALTER TABLE public."USUARIO" ALTER COLUMN "ID" ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public."USUARIO_UID_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);
            public          postgres    false    218            �          0    16400    ENDERECO 
   TABLE DATA           R   COPY public."ENDERECO" ("ID", "RUA", "CIDADE", "COMPL", "CEP", "NUM") FROM stdin;
    public          postgres    false    216   t*       �          0    16447    FAVORITO 
   TABLE DATA           5   COPY public."FAVORITO" ("UID", "ITEMID") FROM stdin;
    public          postgres    false    223   	+       �          0    16462 
   ITEMPEDIDO 
   TABLE DATA           F   COPY public."ITEMPEDIDO" ("PEDIDOID", "ITEMID", "QUANTT") FROM stdin;
    public          postgres    false    224   ;+       �          0    16440    MENU 
   TABLE DATA           [   COPY public."MENU" ("ID", "NOME", "DESCRICAO", "VALOR", "CATEGORIA", "IMAGEM") FROM stdin;
    public          postgres    false    222   X+       �          0    16427    PEDIDO 
   TABLE DATA           8   COPY public."PEDIDO" ("ID", "UID", "VALOR") FROM stdin;
    public          postgres    false    220   +/       �          0    16414    USUARIO 
   TABLE DATA           W   COPY public."USUARIO" ("ID", "UNOME", "UEMAIL", "UPASS", "ENDID", "PHONE") FROM stdin;
    public          postgres    false    218   i/       �           0    0    ENDERECO_ID_seq    SEQUENCE SET     @   SELECT pg_catalog.setval('public."ENDERECO_ID_seq"', 22, true);
          public          postgres    false    215            �           0    0    MENU_ID_seq    SEQUENCE SET     <   SELECT pg_catalog.setval('public."MENU_ID_seq"', 33, true);
          public          postgres    false    221            �           0    0    PEDIDO_ID_seq    SEQUENCE SET     ?   SELECT pg_catalog.setval('public."PEDIDO_ID_seq"', 113, true);
          public          postgres    false    219            �           0    0    USUARIO_UID_seq    SEQUENCE SET     ?   SELECT pg_catalog.setval('public."USUARIO_UID_seq"', 8, true);
          public          postgres    false    217            2           2606    16406    ENDERECO ENDERECO_pkey 
   CONSTRAINT     Z   ALTER TABLE ONLY public."ENDERECO"
    ADD CONSTRAINT "ENDERECO_pkey" PRIMARY KEY ("ID");
 D   ALTER TABLE ONLY public."ENDERECO" DROP CONSTRAINT "ENDERECO_pkey";
       public            postgres    false    216            :           2606    16451    FAVORITO FAVORITO_pkey 
   CONSTRAINT     e   ALTER TABLE ONLY public."FAVORITO"
    ADD CONSTRAINT "FAVORITO_pkey" PRIMARY KEY ("UID", "ITEMID");
 D   ALTER TABLE ONLY public."FAVORITO" DROP CONSTRAINT "FAVORITO_pkey";
       public            postgres    false    223    223            <           2606    16466    ITEMPEDIDO ITEMPEDIDO_pkey 
   CONSTRAINT     n   ALTER TABLE ONLY public."ITEMPEDIDO"
    ADD CONSTRAINT "ITEMPEDIDO_pkey" PRIMARY KEY ("PEDIDOID", "ITEMID");
 H   ALTER TABLE ONLY public."ITEMPEDIDO" DROP CONSTRAINT "ITEMPEDIDO_pkey";
       public            postgres    false    224    224            8           2606    16446    MENU MENU_pkey 
   CONSTRAINT     R   ALTER TABLE ONLY public."MENU"
    ADD CONSTRAINT "MENU_pkey" PRIMARY KEY ("ID");
 <   ALTER TABLE ONLY public."MENU" DROP CONSTRAINT "MENU_pkey";
       public            postgres    false    222            6           2606    16433    PEDIDO PEDIDO_pkey 
   CONSTRAINT     V   ALTER TABLE ONLY public."PEDIDO"
    ADD CONSTRAINT "PEDIDO_pkey" PRIMARY KEY ("ID");
 @   ALTER TABLE ONLY public."PEDIDO" DROP CONSTRAINT "PEDIDO_pkey";
       public            postgres    false    220            4           2606    16420    USUARIO USUARIO_pkey 
   CONSTRAINT     X   ALTER TABLE ONLY public."USUARIO"
    ADD CONSTRAINT "USUARIO_pkey" PRIMARY KEY ("ID");
 B   ALTER TABLE ONLY public."USUARIO" DROP CONSTRAINT "USUARIO_pkey";
       public            postgres    false    218            ?           2606    16457    FAVORITO fk_MENU    FK CONSTRAINT     w   ALTER TABLE ONLY public."FAVORITO"
    ADD CONSTRAINT "fk_MENU" FOREIGN KEY ("ITEMID") REFERENCES public."MENU"("ID");
 >   ALTER TABLE ONLY public."FAVORITO" DROP CONSTRAINT "fk_MENU";
       public          postgres    false    223    222    4664            A           2606    16472    ITEMPEDIDO fk_MENU    FK CONSTRAINT     y   ALTER TABLE ONLY public."ITEMPEDIDO"
    ADD CONSTRAINT "fk_MENU" FOREIGN KEY ("ITEMID") REFERENCES public."MENU"("ID");
 @   ALTER TABLE ONLY public."ITEMPEDIDO" DROP CONSTRAINT "fk_MENU";
       public          postgres    false    222    4664    224            B           2606    16467    ITEMPEDIDO fk_PEDIDO    FK CONSTRAINT        ALTER TABLE ONLY public."ITEMPEDIDO"
    ADD CONSTRAINT "fk_PEDIDO" FOREIGN KEY ("PEDIDOID") REFERENCES public."PEDIDO"("ID");
 B   ALTER TABLE ONLY public."ITEMPEDIDO" DROP CONSTRAINT "fk_PEDIDO";
       public          postgres    false    224    220    4662            @           2606    16452    FAVORITO fk_USUARIO    FK CONSTRAINT     z   ALTER TABLE ONLY public."FAVORITO"
    ADD CONSTRAINT "fk_USUARIO" FOREIGN KEY ("UID") REFERENCES public."USUARIO"("ID");
 A   ALTER TABLE ONLY public."FAVORITO" DROP CONSTRAINT "fk_USUARIO";
       public          postgres    false    218    4660    223            =           2606    16421    USUARIO fk_endereco    FK CONSTRAINT     {   ALTER TABLE ONLY public."USUARIO"
    ADD CONSTRAINT fk_endereco FOREIGN KEY ("ENDID") REFERENCES public."ENDERECO"("ID");
 ?   ALTER TABLE ONLY public."USUARIO" DROP CONSTRAINT fk_endereco;
       public          postgres    false    218    4658    216            >           2606    16434    PEDIDO fk_usuario    FK CONSTRAINT     v   ALTER TABLE ONLY public."PEDIDO"
    ADD CONSTRAINT fk_usuario FOREIGN KEY ("UID") REFERENCES public."USUARIO"("ID");
 =   ALTER TABLE ONLY public."PEDIDO" DROP CONSTRAINT fk_usuario;
       public          postgres    false    4660    218    220            �   �   x�e�;�0�z}
_ ��ĩ�(((��L��B�sR�X�b���:��������Ҍ	1�olσ��L��h��G��_�pn*1��o�H9���aɒ@����tyK�b�u֝��퍝b>��g���j6�      �   "   x�3�42�2�4��2�4�� b#3�=... 7Y�      �      x������ � �      �   �  x����n�H���O����1���BppX����2�8̂;��H;o�)�y���b[|��_"ԩ����U�e�, ���6�=���&�Y.�������������_^��E<Y����E�&t^.�%�p�$t��U��F�e�-$�]$��_����G���KW�J�j���T�3�mϺ/��U�K��zfk�s���3�\���n��ߘQ���/����S�qCr�k�t\�]x?~@�1ɂ�J�0c�����"@�;L��};LO�i-n��4�t:m]�3hө6�������1�EQ�5�����YT�AO��A��P��;~��"�����5�~J��<�z�9jCjH�x�ڛ��xE`�ih{��B[�g���m����/�Xnc.����_�w���!b����nY�f�6�E�����ı��Ԧ��A��į�hȨ�P�W��R�cR+�*�T\�k�(ǲ�|P@�uF6�4ݺ�jEl��C�$��:�\��픾�k�k���U���|����|������<����G�J,fr$I��^�������oN�ga�>;��.�/�C2]��.]y,��\��ߊ3������ ��aD5,�iL��CC'����̒��f8���M��b3��^3YӲ5��
V �?W���W�gpy�J��<|宇.�!]��O&˘�"\{��(��<:<�t�f�z14�v�:������KZ�n}�#�iw�97S::=%??�ۦ��ؐTGD.|������O���K�86�ޖ#O����C{鸟�O���-]��udO\�O ��'����9��Y<��YQ�ę�'Z�y������(y���C���G�sg߽F{�­�����2��k#e�!\!{�A� %<��]	O;� ����`_���	n�0nP�e���e�k��q�V�+������f�X��+J�����      �   .   x�344�4�4ӳ��244�4�42�31��9-8-�,͸b���� ��6      �   >  x�m�˒�@�u�Y��,��nv��xp*�v`���y�hfR��ٜ���|�F���S�IE�m��䨾f)h�M�-�N1��]⻦����Hےm��s=�^o�'㎞�q�h1�bQ�S��N,�6s��B�u��l�^��?/�Rm���G�R��^ڌ�m8�l���P0��J�(���Lh�A:����8���☔\N����c�����]�Γ�N{Z �P���Y$MN��N��I����n�dV��Pm�ָ���\5w�g堚';�t�B�� �v1C!@�rW��x$:�]��n��[$tߤ�Er�>⧽�pV6�����4�O���EİƦ� ������Z_2D�N]��׏0>hk9զ�i?=EA���>K�G��|e��,����#��}&���Y��$����(���*ڹ��M2�P������qpF�\����[:|��Q�_�����H�q_���(n윉%�9m�M���*=�d-th�K7�m���h��i3����@�&�'�����M��*��w��     