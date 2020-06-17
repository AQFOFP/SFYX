/*
Navicat MySQL Data Transfer

Source Server         : mysql
Source Server Version : 50717
Source Host           : localhost:3306
Source Database       : sfyx_db

Target Server Type    : MYSQL
Target Server Version : 50717
File Encoding         : 65001

Date: 2019-10-12 09:46:44
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for `auth_group`
-- ----------------------------
DROP TABLE IF EXISTS `auth_group`;
CREATE TABLE `auth_group` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(80) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `name` (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of auth_group
-- ----------------------------

-- ----------------------------
-- Table structure for `auth_group_permissions`
-- ----------------------------
DROP TABLE IF EXISTS `auth_group_permissions`;
CREATE TABLE `auth_group_permissions` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `group_id` int(11) NOT NULL,
  `permission_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `auth_group_permissions_group_id_permission_id_0cd325b0_uniq` (`group_id`,`permission_id`),
  KEY `auth_group_permissio_permission_id_84c5c92e_fk_auth_perm` (`permission_id`),
  CONSTRAINT `auth_group_permissio_permission_id_84c5c92e_fk_auth_perm` FOREIGN KEY (`permission_id`) REFERENCES `auth_permission` (`id`),
  CONSTRAINT `auth_group_permissions_group_id_b120cbf9_fk_auth_group_id` FOREIGN KEY (`group_id`) REFERENCES `auth_group` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of auth_group_permissions
-- ----------------------------

-- ----------------------------
-- Table structure for `auth_permission`
-- ----------------------------
DROP TABLE IF EXISTS `auth_permission`;
CREATE TABLE `auth_permission` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `content_type_id` int(11) NOT NULL,
  `codename` varchar(100) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `auth_permission_content_type_id_codename_01ab375a_uniq` (`content_type_id`,`codename`),
  CONSTRAINT `auth_permission_content_type_id_2f476e4b_fk_django_co` FOREIGN KEY (`content_type_id`) REFERENCES `django_content_type` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=40 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of auth_permission
-- ----------------------------
INSERT INTO `auth_permission` VALUES ('1', 'Can add log entry', '1', 'add_logentry');
INSERT INTO `auth_permission` VALUES ('2', 'Can change log entry', '1', 'change_logentry');
INSERT INTO `auth_permission` VALUES ('3', 'Can delete log entry', '1', 'delete_logentry');
INSERT INTO `auth_permission` VALUES ('4', 'Can add permission', '2', 'add_permission');
INSERT INTO `auth_permission` VALUES ('5', 'Can change permission', '2', 'change_permission');
INSERT INTO `auth_permission` VALUES ('6', 'Can delete permission', '2', 'delete_permission');
INSERT INTO `auth_permission` VALUES ('7', 'Can add group', '3', 'add_group');
INSERT INTO `auth_permission` VALUES ('8', 'Can change group', '3', 'change_group');
INSERT INTO `auth_permission` VALUES ('9', 'Can delete group', '3', 'delete_group');
INSERT INTO `auth_permission` VALUES ('10', 'Can add user', '4', 'add_user');
INSERT INTO `auth_permission` VALUES ('11', 'Can change user', '4', 'change_user');
INSERT INTO `auth_permission` VALUES ('12', 'Can delete user', '4', 'delete_user');
INSERT INTO `auth_permission` VALUES ('13', 'Can add content type', '5', 'add_contenttype');
INSERT INTO `auth_permission` VALUES ('14', 'Can change content type', '5', 'change_contenttype');
INSERT INTO `auth_permission` VALUES ('15', 'Can delete content type', '5', 'delete_contenttype');
INSERT INTO `auth_permission` VALUES ('16', 'Can add session', '6', 'add_session');
INSERT INTO `auth_permission` VALUES ('17', 'Can change session', '6', 'change_session');
INSERT INTO `auth_permission` VALUES ('18', 'Can delete session', '6', 'delete_session');
INSERT INTO `auth_permission` VALUES ('19', 'Can add lubo', '7', 'add_lubo');
INSERT INTO `auth_permission` VALUES ('20', 'Can change lubo', '7', 'change_lubo');
INSERT INTO `auth_permission` VALUES ('21', 'Can delete lubo', '7', 'delete_lubo');
INSERT INTO `auth_permission` VALUES ('22', 'Can add user', '8', 'add_user');
INSERT INTO `auth_permission` VALUES ('23', 'Can change user', '8', 'change_user');
INSERT INTO `auth_permission` VALUES ('24', 'Can delete user', '8', 'delete_user');
INSERT INTO `auth_permission` VALUES ('25', 'Can add youxbg', '9', 'add_youxbg');
INSERT INTO `auth_permission` VALUES ('26', 'Can change youxbg', '9', 'change_youxbg');
INSERT INTO `auth_permission` VALUES ('27', 'Can delete youxbg', '9', 'delete_youxbg');
INSERT INTO `auth_permission` VALUES ('28', 'Can add goods', '9', 'add_goods');
INSERT INTO `auth_permission` VALUES ('29', 'Can change goods', '9', 'change_goods');
INSERT INTO `auth_permission` VALUES ('30', 'Can delete goods', '9', 'delete_goods');
INSERT INTO `auth_permission` VALUES ('31', 'Can add goodstype', '10', 'add_goodstype');
INSERT INTO `auth_permission` VALUES ('32', 'Can change goodstype', '10', 'change_goodstype');
INSERT INTO `auth_permission` VALUES ('33', 'Can delete goodstype', '10', 'delete_goodstype');
INSERT INTO `auth_permission` VALUES ('34', 'Can add order', '11', 'add_order');
INSERT INTO `auth_permission` VALUES ('35', 'Can change order', '11', 'change_order');
INSERT INTO `auth_permission` VALUES ('36', 'Can delete order', '11', 'delete_order');
INSERT INTO `auth_permission` VALUES ('37', 'Can add order detail', '12', 'add_orderdetail');
INSERT INTO `auth_permission` VALUES ('38', 'Can change order detail', '12', 'change_orderdetail');
INSERT INTO `auth_permission` VALUES ('39', 'Can delete order detail', '12', 'delete_orderdetail');

-- ----------------------------
-- Table structure for `auth_user`
-- ----------------------------
DROP TABLE IF EXISTS `auth_user`;
CREATE TABLE `auth_user` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `password` varchar(128) NOT NULL,
  `last_login` datetime(6) DEFAULT NULL,
  `is_superuser` tinyint(1) NOT NULL,
  `username` varchar(150) NOT NULL,
  `first_name` varchar(30) NOT NULL,
  `last_name` varchar(30) NOT NULL,
  `email` varchar(254) NOT NULL,
  `is_staff` tinyint(1) NOT NULL,
  `is_active` tinyint(1) NOT NULL,
  `date_joined` datetime(6) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `username` (`username`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of auth_user
-- ----------------------------

-- ----------------------------
-- Table structure for `auth_user_groups`
-- ----------------------------
DROP TABLE IF EXISTS `auth_user_groups`;
CREATE TABLE `auth_user_groups` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL,
  `group_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `auth_user_groups_user_id_group_id_94350c0c_uniq` (`user_id`,`group_id`),
  KEY `auth_user_groups_group_id_97559544_fk_auth_group_id` (`group_id`),
  CONSTRAINT `auth_user_groups_group_id_97559544_fk_auth_group_id` FOREIGN KEY (`group_id`) REFERENCES `auth_group` (`id`),
  CONSTRAINT `auth_user_groups_user_id_6a12ed8b_fk_auth_user_id` FOREIGN KEY (`user_id`) REFERENCES `auth_user` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of auth_user_groups
-- ----------------------------

-- ----------------------------
-- Table structure for `auth_user_user_permissions`
-- ----------------------------
DROP TABLE IF EXISTS `auth_user_user_permissions`;
CREATE TABLE `auth_user_user_permissions` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL,
  `permission_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `auth_user_user_permissions_user_id_permission_id_14a6b632_uniq` (`user_id`,`permission_id`),
  KEY `auth_user_user_permi_permission_id_1fbb5f2c_fk_auth_perm` (`permission_id`),
  CONSTRAINT `auth_user_user_permi_permission_id_1fbb5f2c_fk_auth_perm` FOREIGN KEY (`permission_id`) REFERENCES `auth_permission` (`id`),
  CONSTRAINT `auth_user_user_permissions_user_id_a95ead1b_fk_auth_user_id` FOREIGN KEY (`user_id`) REFERENCES `auth_user` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of auth_user_user_permissions
-- ----------------------------

-- ----------------------------
-- Table structure for `django_admin_log`
-- ----------------------------
DROP TABLE IF EXISTS `django_admin_log`;
CREATE TABLE `django_admin_log` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `action_time` datetime(6) NOT NULL,
  `object_id` longtext,
  `object_repr` varchar(200) NOT NULL,
  `action_flag` smallint(5) unsigned NOT NULL,
  `change_message` longtext NOT NULL,
  `content_type_id` int(11) DEFAULT NULL,
  `user_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `django_admin_log_content_type_id_c4bce8eb_fk_django_co` (`content_type_id`),
  KEY `django_admin_log_user_id_c564eba6_fk_auth_user_id` (`user_id`),
  CONSTRAINT `django_admin_log_content_type_id_c4bce8eb_fk_django_co` FOREIGN KEY (`content_type_id`) REFERENCES `django_content_type` (`id`),
  CONSTRAINT `django_admin_log_user_id_c564eba6_fk_auth_user_id` FOREIGN KEY (`user_id`) REFERENCES `auth_user` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of django_admin_log
-- ----------------------------

-- ----------------------------
-- Table structure for `django_content_type`
-- ----------------------------
DROP TABLE IF EXISTS `django_content_type`;
CREATE TABLE `django_content_type` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `app_label` varchar(100) NOT NULL,
  `model` varchar(100) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `django_content_type_app_label_model_76bd3d3b_uniq` (`app_label`,`model`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of django_content_type
-- ----------------------------
INSERT INTO `django_content_type` VALUES ('1', 'admin', 'logentry');
INSERT INTO `django_content_type` VALUES ('3', 'auth', 'group');
INSERT INTO `django_content_type` VALUES ('2', 'auth', 'permission');
INSERT INTO `django_content_type` VALUES ('4', 'auth', 'user');
INSERT INTO `django_content_type` VALUES ('5', 'contenttypes', 'contenttype');
INSERT INTO `django_content_type` VALUES ('9', 'home', 'goods');
INSERT INTO `django_content_type` VALUES ('10', 'home', 'goodstype');
INSERT INTO `django_content_type` VALUES ('7', 'home', 'lubo');
INSERT INTO `django_content_type` VALUES ('11', 'order', 'order');
INSERT INTO `django_content_type` VALUES ('12', 'order', 'orderdetail');
INSERT INTO `django_content_type` VALUES ('6', 'sessions', 'session');
INSERT INTO `django_content_type` VALUES ('8', 'user', 'user');

-- ----------------------------
-- Table structure for `django_migrations`
-- ----------------------------
DROP TABLE IF EXISTS `django_migrations`;
CREATE TABLE `django_migrations` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `app` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `applied` datetime(6) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=27 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of django_migrations
-- ----------------------------
INSERT INTO `django_migrations` VALUES ('1', 'contenttypes', '0001_initial', '2019-10-04 16:55:54.693576');
INSERT INTO `django_migrations` VALUES ('2', 'auth', '0001_initial', '2019-10-04 16:56:04.027109');
INSERT INTO `django_migrations` VALUES ('3', 'admin', '0001_initial', '2019-10-04 16:56:06.824269');
INSERT INTO `django_migrations` VALUES ('4', 'admin', '0002_logentry_remove_auto_add', '2019-10-04 16:56:06.873272');
INSERT INTO `django_migrations` VALUES ('5', 'contenttypes', '0002_remove_content_type_name', '2019-10-04 16:56:08.336356');
INSERT INTO `django_migrations` VALUES ('6', 'auth', '0002_alter_permission_name_max_length', '2019-10-04 16:56:09.143402');
INSERT INTO `django_migrations` VALUES ('7', 'auth', '0003_alter_user_email_max_length', '2019-10-04 16:56:10.457477');
INSERT INTO `django_migrations` VALUES ('8', 'auth', '0004_alter_user_username_opts', '2019-10-04 16:56:10.495479');
INSERT INTO `django_migrations` VALUES ('9', 'auth', '0005_alter_user_last_login_null', '2019-10-04 16:56:11.180519');
INSERT INTO `django_migrations` VALUES ('10', 'auth', '0006_require_contenttypes_0002', '2019-10-04 16:56:11.220521');
INSERT INTO `django_migrations` VALUES ('11', 'auth', '0007_alter_validators_add_error_messages', '2019-10-04 16:56:11.256523');
INSERT INTO `django_migrations` VALUES ('12', 'auth', '0008_alter_user_username_max_length', '2019-10-04 16:56:12.202577');
INSERT INTO `django_migrations` VALUES ('14', 'sessions', '0001_initial', '2019-10-04 16:56:13.151631');
INSERT INTO `django_migrations` VALUES ('16', 'user', '0001_initial', '2019-10-05 09:47:53.041030');
INSERT INTO `django_migrations` VALUES ('17', 'user', '0002_auto_20191005_1748', '2019-10-05 09:48:55.645611');
INSERT INTO `django_migrations` VALUES ('18', 'user', '0003_auto_20191006_1058', '2019-10-06 02:58:26.085749');
INSERT INTO `django_migrations` VALUES ('21', 'home', '0001_initial', '2019-10-08 07:26:11.229188');
INSERT INTO `django_migrations` VALUES ('22', 'home', '0002_goods_detailimg', '2019-10-08 08:43:52.783814');
INSERT INTO `django_migrations` VALUES ('23', 'home', '0003_auto_20191008_1704', '2019-10-08 09:04:04.467118');
INSERT INTO `django_migrations` VALUES ('24', 'home', '0004_goods_storenums', '2019-10-10 12:13:18.789900');
INSERT INTO `django_migrations` VALUES ('25', 'order', '0001_initial', '2019-10-10 12:36:22.544046');
INSERT INTO `django_migrations` VALUES ('26', 'order', '0002_auto_20191010_2045', '2019-10-10 12:45:24.750058');

-- ----------------------------
-- Table structure for `django_session`
-- ----------------------------
DROP TABLE IF EXISTS `django_session`;
CREATE TABLE `django_session` (
  `session_key` varchar(40) NOT NULL,
  `session_data` longtext NOT NULL,
  `expire_date` datetime(6) NOT NULL,
  PRIMARY KEY (`session_key`),
  KEY `django_session_expire_date_a5c62663` (`expire_date`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of django_session
-- ----------------------------
INSERT INTO `django_session` VALUES ('onyvw6uwlhzg7g8kokze9a9crr782n09', 'NDA1YmZjODhlYzQzMjU1N2VjMDNhN2VjNDljYTA1MGE5OTdiY2Y5Nzp7InBob25lIjoiMTMxNjA2NzUwOTciLCJfc2Vzc2lvbl9leHBpcnkiOjg2NDAwfQ==', '2019-10-12 07:11:52.259436');
INSERT INTO `django_session` VALUES ('zwp7s27czc5gpm8aq2qvci04r7jnwkn7', 'NDA1YmZjODhlYzQzMjU1N2VjMDNhN2VjNDljYTA1MGE5OTdiY2Y5Nzp7InBob25lIjoiMTMxNjA2NzUwOTciLCJfc2Vzc2lvbl9leHBpcnkiOjg2NDAwfQ==', '2019-10-11 00:58:23.671592');

-- ----------------------------
-- Table structure for `sfyx_goods`
-- ----------------------------
DROP TABLE IF EXISTS `sfyx_goods`;
CREATE TABLE `sfyx_goods` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `goodsname` varchar(100) NOT NULL,
  `weight` varchar(100) NOT NULL,
  `allweight` varchar(100) NOT NULL,
  `price` decimal(6,2) NOT NULL,
  `allprice` decimal(6,2) NOT NULL,
  `privilege` varchar(100) NOT NULL,
  `mustbuy` tinyint(1) NOT NULL,
  `goodsimg` varchar(100) NOT NULL,
  `goodstype_id` int(11) DEFAULT NULL,
  `detailimg` varchar(500) DEFAULT NULL,
  `storenums` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `sfyx_goods_goodstype_id_ab865691_fk_sfyx_goodstype_id` (`goodstype_id`),
  CONSTRAINT `sfyx_goods_goodstype_id_ab865691_fk_sfyx_goodstype_id` FOREIGN KEY (`goodstype_id`) REFERENCES `sfyx_goodstype` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of sfyx_goods
-- ----------------------------
INSERT INTO `sfyx_goods` VALUES ('1', '顶诺家庭菲力牛排10片', '122', '122', '122.00', '122.00', '优惠（无）', '1', '/static/img/youxuanbimai1.jpg', '1', 'http://p02.sfimg.cn/2018/1800219343/thumb_1800219343_8_01.jpg#http://p02.sfimg.cn/2018/1800219343/thumb_1800219343_8_02.jpg#http://p02.sfimg.cn/2018/1800219343/thumb_1800219343_8_03.jpg#http://p02.sfimg.cn/2018/1800219343/thumb_1800219343_9_001.jpg', '487');
INSERT INTO `sfyx_goods` VALUES ('2', '品利特级初榨橄榄油礼盒750ml*2', '156', '156', '12.00', '12.00', '优惠（无）', '1', '/static/img/youxuanbimai2.jpg', '7', 'http://p02.sfimg.cn/2013/1300021057/thumb_1300021057_9_01.jpg#http://p02.sfimg.cn/2013/1300021057/thumb_1300021057_9_02.jpg#http://p02.sfimg.cn/2013/1300021057/thumb_1300021057_9_03.jpg#http://p02.sfimg.cn/2013/1300021057/thumb_1300021057_9_04.jpg', '449');
INSERT INTO `sfyx_goods` VALUES ('3', '茅台53度飞天整箱装500mlx6瓶', '132', '132', '22.00', '22.00', '优惠（无）', '1', '/static/img/youxuanbimai3.jpg', '4', null, '19');
INSERT INTO `sfyx_goods` VALUES ('4', '百年栗圆北京油鸡母鸡肉', '13', '13', '122.00', '122.00', '优惠（无）', '1', '/static/img/youxuanbimai4.jpg', '1', null, '49');
INSERT INTO `sfyx_goods` VALUES ('5', '优口一族泰国香造米', '1000', '1000', '45.00', '45.00', '优惠（无）', '1', '/static/img/youxuanbimai5.jpg', '7', null, '49');
INSERT INTO `sfyx_goods` VALUES ('6', '胡姬花古法小榨花生油1.918L', '15', '15', '145.00', '145.00', '优惠（无）', '1', '/static/img/youxuanbimai6.jpg', '7', null, '44');
INSERT INTO `sfyx_goods` VALUES ('7', '爱氏晨曦脱脂纯牛奶1L*12盒', '8', '8', '352.00', '352.00', '优惠（无）', '1', '/static/img/youxuanbimai7.jpg', '2', null, '50');
INSERT INTO `sfyx_goods` VALUES ('8', 'ARBUMASA阿根廷红虾', '500', '500', '155.00', '155.00', '优惠（无）', '1', '/static/img/youxuanbimai8.jpg', '1', null, '45');

-- ----------------------------
-- Table structure for `sfyx_goodstype`
-- ----------------------------
DROP TABLE IF EXISTS `sfyx_goodstype`;
CREATE TABLE `sfyx_goodstype` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `typename` varchar(100) NOT NULL,
  `parent_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `sfyx_goodstype_parent_id_95d53cec_fk_sfyx_goodstype_id` (`parent_id`),
  CONSTRAINT `sfyx_goodstype_parent_id_95d53cec_fk_sfyx_goodstype_id` FOREIGN KEY (`parent_id`) REFERENCES `sfyx_goodstype` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of sfyx_goodstype
-- ----------------------------
INSERT INTO `sfyx_goodstype` VALUES ('1', '肉类海鲜', null);
INSERT INTO `sfyx_goodstype` VALUES ('2', '熟食蛋奶', null);
INSERT INTO `sfyx_goodstype` VALUES ('3', '水果蔬菜', null);
INSERT INTO `sfyx_goodstype` VALUES ('4', '酒水饮料', null);
INSERT INTO `sfyx_goodstype` VALUES ('5', '休闲食品', null);
INSERT INTO `sfyx_goodstype` VALUES ('6', '冲调茶饮', null);
INSERT INTO `sfyx_goodstype` VALUES ('7', '粮油干货', null);
INSERT INTO `sfyx_goodstype` VALUES ('8', '优选国际', null);

-- ----------------------------
-- Table structure for `sfyx_lubo`
-- ----------------------------
DROP TABLE IF EXISTS `sfyx_lubo`;
CREATE TABLE `sfyx_lubo` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `imgaddr` varchar(200) NOT NULL,
  `imgtype` varchar(200) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of sfyx_lubo
-- ----------------------------
INSERT INTO `sfyx_lubo` VALUES ('1', '/static/img/lunbo0.jpg', 'main');
INSERT INTO `sfyx_lubo` VALUES ('2', '/static/img/lunbo1.jpg', 'main');
INSERT INTO `sfyx_lubo` VALUES ('3', '/static/img/lunbo2.jpg', 'main');
INSERT INTO `sfyx_lubo` VALUES ('4', '/static/img/lunbo3.jpg', 'main');
INSERT INTO `sfyx_lubo` VALUES ('5', '/static/img/lunbo4.jpg', 'main');
INSERT INTO `sfyx_lubo` VALUES ('6', '/static/img/lunbo5.jpg', 'main');
INSERT INTO `sfyx_lubo` VALUES ('7', '/static/img/lunbo6.jpg', 'main');
INSERT INTO `sfyx_lubo` VALUES ('8', '/static/img/mooncake.png', 'side');
INSERT INTO `sfyx_lubo` VALUES ('9', '/static/img/panxie.png', 'side');
INSERT INTO `sfyx_lubo` VALUES ('10', '/static/img/dazhaxie.png', 'side');

-- ----------------------------
-- Table structure for `sfyx_order`
-- ----------------------------
DROP TABLE IF EXISTS `sfyx_order`;
CREATE TABLE `sfyx_order` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `phone` varchar(100) NOT NULL,
  `order_code` varchar(100) NOT NULL,
  `total_count` int(11) NOT NULL,
  `total_amount` decimal(9,2) NOT NULL,
  `status` smallint(6) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of sfyx_order
-- ----------------------------
INSERT INTO `sfyx_order` VALUES ('1', '13160675097', '2019101117303313160675097', '14', '968.00', '2');
INSERT INTO `sfyx_order` VALUES ('2', '13160675097', '2019101117315313160675097', '4', '620.00', '2');
INSERT INTO `sfyx_order` VALUES ('3', '13160675097', '2019101117331813160675097', '2', '144.00', '2');
INSERT INTO `sfyx_order` VALUES ('4', '13160675097', '2019101117333813160675097', '4', '480.00', '2');
INSERT INTO `sfyx_order` VALUES ('5', '13160675097', '2019101117335713160675097', '1', '122.00', '2');
INSERT INTO `sfyx_order` VALUES ('6', '13160675097', '2019101119240413160675097', '4', '48.00', '1');
INSERT INTO `sfyx_order` VALUES ('9', '13160675097', '2019101119543713160675097', '2', '24.00', '1');
INSERT INTO `sfyx_order` VALUES ('10', '13160675098', '2019101120191413160675098', '3', '56.00', '2');
INSERT INTO `sfyx_order` VALUES ('11', '13160675098', '2019101120411113160675098', '1', '12.00', '1');
INSERT INTO `sfyx_order` VALUES ('12', '13160675888', '2019101121211413160675888', '8', '96.00', '2');
INSERT INTO `sfyx_order` VALUES ('13', '13160675097', '2019101121420913160675097', '1', '122.00', '1');
INSERT INTO `sfyx_order` VALUES ('14', '13160675097', '2019101209404113160675097', '6', '378.00', '1');
INSERT INTO `sfyx_order` VALUES ('15', '13160675098', '2019101209422213160675098', '4', '488.00', '1');

-- ----------------------------
-- Table structure for `sfyx_order_detail`
-- ----------------------------
DROP TABLE IF EXISTS `sfyx_order_detail`;
CREATE TABLE `sfyx_order_detail` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `phone` varchar(100) NOT NULL,
  `order_code` varchar(100) NOT NULL,
  `goods_id` int(11) NOT NULL,
  `counts` int(11) NOT NULL,
  `price` decimal(6,2) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=20 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of sfyx_order_detail
-- ----------------------------
INSERT INTO `sfyx_order_detail` VALUES ('1', '13160675097', '2019101117303313160675097', '1', '7', '122.00');
INSERT INTO `sfyx_order_detail` VALUES ('2', '13160675097', '2019101117303313160675097', '2', '4', '12.00');
INSERT INTO `sfyx_order_detail` VALUES ('3', '13160675097', '2019101117303313160675097', '3', '3', '22.00');
INSERT INTO `sfyx_order_detail` VALUES ('4', '13160675097', '2019101117315313160675097', '8', '4', '155.00');
INSERT INTO `sfyx_order_detail` VALUES ('5', '13160675097', '2019101117331813160675097', '1', '1', '122.00');
INSERT INTO `sfyx_order_detail` VALUES ('6', '13160675097', '2019101117331813160675097', '3', '1', '22.00');
INSERT INTO `sfyx_order_detail` VALUES ('7', '13160675097', '2019101117333813160675097', '5', '1', '45.00');
INSERT INTO `sfyx_order_detail` VALUES ('8', '13160675097', '2019101117333813160675097', '6', '3', '145.00');
INSERT INTO `sfyx_order_detail` VALUES ('9', '13160675097', '2019101117335713160675097', '4', '1', '122.00');
INSERT INTO `sfyx_order_detail` VALUES ('10', '13160675097', '2019101119240413160675097', '2', '4', '12.00');
INSERT INTO `sfyx_order_detail` VALUES ('11', '13160675097', '2019101119543713160675097', '2', '2', '12.00');
INSERT INTO `sfyx_order_detail` VALUES ('12', '13160675098', '2019101120191413160675098', '2', '1', '12.00');
INSERT INTO `sfyx_order_detail` VALUES ('13', '13160675098', '2019101120191413160675098', '3', '2', '22.00');
INSERT INTO `sfyx_order_detail` VALUES ('14', '13160675098', '2019101120411113160675098', '2', '1', '12.00');
INSERT INTO `sfyx_order_detail` VALUES ('15', '13160675888', '2019101121211413160675888', '2', '8', '12.00');
INSERT INTO `sfyx_order_detail` VALUES ('16', '13160675097', '2019101121420913160675097', '1', '1', '122.00');
INSERT INTO `sfyx_order_detail` VALUES ('17', '13160675097', '2019101209404113160675097', '6', '2', '145.00');
INSERT INTO `sfyx_order_detail` VALUES ('18', '13160675097', '2019101209404113160675097', '3', '4', '22.00');
INSERT INTO `sfyx_order_detail` VALUES ('19', '13160675098', '2019101209422213160675098', '1', '4', '122.00');

-- ----------------------------
-- Table structure for `sfyx_user`
-- ----------------------------
DROP TABLE IF EXISTS `sfyx_user`;
CREATE TABLE `sfyx_user` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `phone` varchar(200) NOT NULL,
  `password` varchar(200) NOT NULL,
  `email` varchar(100) DEFAULT NULL,
  `username` varchar(200) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `phone` (`phone`),
  UNIQUE KEY `username` (`username`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of sfyx_user
-- ----------------------------
INSERT INTO `sfyx_user` VALUES ('1', '13160675097', 'pbkdf2_sha256$36000$JDc14TuoYz9z$qJTr+hxOE9iULQeGLVJRYDvDR1eCuhoDTcZyEMBV/fY=', null, '优选用户');
INSERT INTO `sfyx_user` VALUES ('2', '13160675099', 'pbkdf2_sha256$36000$YFJhtrer8eJ4$02ZkMONvh2OkZ9F+xvFdIrZQS9H37+8MHuUvKOZuSLA=', null, '优选用户85164');
INSERT INTO `sfyx_user` VALUES ('3', '13160675093', 'pbkdf2_sha256$36000$mK6SSnpzvaBN$AS6Tkw5b8XDGXoVusqqLuW2XpCb9yr4mRvXBNk8uK7k=', null, '优选用户2802c');
INSERT INTO `sfyx_user` VALUES ('4', '13160675090', 'pbkdf2_sha256$36000$bforqfb5fE0x$j+ooX5zYJHiAvGBb7/3DyjvvyLI0HEoDQ5RLHnDAJWs=', null, '优选用户0cc5a');
INSERT INTO `sfyx_user` VALUES ('5', '13160675096', 'pbkdf2_sha256$36000$kPVGHqAP1F9L$iXvaCysssAbeWfoNe8HWifnX10xGEb878dQy+ko3chk=', null, '优选用户56bba');
INSERT INTO `sfyx_user` VALUES ('6', '13160675098', 'pbkdf2_sha256$36000$q5mnsWhmsFOd$G/U7GiO6K1rDbReUO0zLvQFyb8qT+uuBD/aOeK/9jDo=', null, '优选用户42183');
INSERT INTO `sfyx_user` VALUES ('7', '13160675888', 'pbkdf2_sha256$36000$s6cc2dZ6EvA2$tmyerPW+XDiKLUW7/ljt0F3STxntV6IRFBmhqdLP+yc=', null, '优选用户e0a6b');
