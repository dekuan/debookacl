<?php

namespace dekuan\debookacl;


class CAcl
{
	//
	//	PERMISSION, max value is 4294967296 ( 1 << 32 )
	//
	const PERMISSION_BOOK_GROUP		= 1 << 0x10;
	const PERMISSION_BOOK_MEMBER		= 1 << 0x11;
	const PERMISSION_BOOK_CLASSROOM		= 1 << 0x12;
	const PERMISSION_BOOK_COURSE		= 1 << 0x13;
	const PERMISSION_BOOK_CONSUME		= 1 << 0x14;
	const PERMISSION_BOOK_TOP_UP		= 1 << 0x15;
	const PERMISSION_BOOK_COMMENT		= 1 << 0x16;
	const PERMISSION_BOOK_COMMENT_TAG	= 1 << 0x17;
	const PERMISSION_BOOK_FAVORITE		= 1 << 0x18;



	//
	//	Roles
	//
	const ROLE_ACCOUNT_ADMIN	= 1;
	const ROLE_ACCOUNT_SALE		= 2;

	const ROLE_BOOK_ADMIN		= 100;
	const ROLE_BOOK_TEACHER		= 101;
	const ROLE_BOOK_ASSISTANT	= 102;
	const ROLE_BOOK_STUDENT		= 103;



	//
	//	Access Control List
	//
	const ACL	=
	[
		self::ROLE_ACCOUNT_ADMIN	=> [],
		self::ROLE_ACCOUNT_SALE		=> [],

		self::ROLE_BOOK_ADMIN		=>
		[
			'r'	=> self::PERMISSION_BOOK_GROUP |
				self::PERMISSION_BOOK_MEMBER |
				self::PERMISSION_BOOK_CLASSROOM |
				self::PERMISSION_BOOK_COURSE |
				self::PERMISSION_BOOK_CONSUME |
				self::PERMISSION_BOOK_TOP_UP |
				self::PERMISSION_BOOK_COMMENT |
				self::PERMISSION_BOOK_COMMENT_TAG |
				self::PERMISSION_BOOK_FAVORITE,

			'w'	=> self::PERMISSION_BOOK_GROUP |
				self::PERMISSION_BOOK_MEMBER |
				self::PERMISSION_BOOK_CLASSROOM |
				self::PERMISSION_BOOK_COURSE |
				self::PERMISSION_BOOK_CONSUME |
				self::PERMISSION_BOOK_TOP_UP |
				self::PERMISSION_BOOK_COMMENT |
				self::PERMISSION_BOOK_COMMENT_TAG |
				self::PERMISSION_BOOK_FAVORITE,
		],

		self::ROLE_BOOK_TEACHER		=>
		[
			'r'	=> self::PERMISSION_BOOK_GROUP |
				self::PERMISSION_BOOK_MEMBER |
				self::PERMISSION_BOOK_CLASSROOM |
				self::PERMISSION_BOOK_COURSE |
				self::PERMISSION_BOOK_CONSUME |
				self::PERMISSION_BOOK_TOP_UP |
				self::PERMISSION_BOOK_COMMENT |
				self::PERMISSION_BOOK_FAVORITE,

			'w'	=> self::PERMISSION_BOOK_COURSE |
				self::PERMISSION_BOOK_COMMENT |
				self::PERMISSION_BOOK_FAVORITE,
		],

		self::ROLE_BOOK_ASSISTANT	=>
		[
			'r'	=> self::PERMISSION_BOOK_GROUP |
				self::PERMISSION_BOOK_MEMBER |
				self::PERMISSION_BOOK_CLASSROOM |
				self::PERMISSION_BOOK_COURSE |
				self::PERMISSION_BOOK_CONSUME |
				self::PERMISSION_BOOK_TOP_UP |
				self::PERMISSION_BOOK_COMMENT,

			'w'	=> 0,
		],

		self::ROLE_BOOK_STUDENT		=>
		[
			'r'	=> self::PERMISSION_BOOK_GROUP |
				self::PERMISSION_BOOK_MEMBER |
				self::PERMISSION_BOOK_CLASSROOM |
				self::PERMISSION_BOOK_COURSE |
				self::PERMISSION_BOOK_CONSUME |
				self::PERMISSION_BOOK_CONSUME |
				self::PERMISSION_BOOK_COMMENT |
				self::PERMISSION_BOOK_FAVORITE,

			'w'	=> self::PERMISSION_BOOK_CONSUME |
				self::PERMISSION_BOOK_CONSUME |
				self::PERMISSION_BOOK_COMMENT |
				self::PERMISSION_BOOK_FAVORITE,
		]
	];

}