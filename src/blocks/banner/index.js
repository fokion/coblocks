/**
 * External dependencies
 */
import classnames from 'classnames';

/**
 * Internal dependencies
 */
// import './styles/style.scss';
// import './styles/editor.scss';
import icons from './components/icons';
import Edit from './components/edit';
import BackgroundPanel, { BackgroundAttributes, BackgroundClasses, BackgroundTransforms } from '../../components/background';
import DimensionsAttributes from '../../components/dimensions-control/attributes';
import CSSGridAttributes from '../../components/grid-control/attributes';

/**
 * WordPress dependencies
 */
const { __ } = wp.i18n;
const { createBlock } = wp.blocks;
const { RichText, getColorClassName, getFontSizeClass, InnerBlocks } = wp.editor;


/**
 * Block constants
 */
const name = 'banner';

const title = __( 'Banner' );

const icon = icons.banner;

const keywords = [
	__( 'button' ),
	__( 'cta' ),
	__( 'call to action' ),
];

const blockAttributes = {
	...CSSGridAttributes,
	...DimensionsAttributes,
	...BackgroundAttributes,
	align: {
		type: 'string',
		default: 'full',
	},
	contentAlign: {
		type: 'string',
	},
	textColor: {
		type: 'string',
	},
	customTextColor: {
		type: 'string',
	},
	maxWidth: {
		type: 'number',
		default: 560,
	},
	saveCoBlocksMeta: {
		type: 'boolean',
		default: true,
	},
	paddingSize: {
		type: 'string',
		default: 'huge',
	},
	paddingUnit: {
		type: 'string',
		default: 'px',
	},
	paddingTop: {
		type: 'number',
		default: 60,
	},
	paddingBottom: {
		type: 'number',
		default: 60,
	},
	paddingLeft: {
		type: 'number',
		default: 60,
	},
	paddingRight: {
		type: 'number',
		default: 60,
	},
	customBackgroundColor: {
		type: 'string',
		default: '#f3f3f3',
	},
};

const settings = {

	title: title,

	description: __( 'Prompt visitors to take action with a call to action heading and button.' ),

	keywords: keywords,

	attributes: blockAttributes,

	supports: {
		align: [ 'wide', 'full' ],
		coBlocksSpacing: true,
	},

	transforms: {
		from: [
			{
				type: 'prefix',
				prefix: ':banner',
				transform: function( content ) {
					return createBlock( `coblocks/${ name }`, {
						content,
					} );
				},
			},
		],
	},

	edit: Edit,

	save( { attributes, className } ) {
		const {
				coblocks,
				layout,
				fullscreen,
				maxWidth,
				backgroundImg,
				backgroundType,
				paddingSize,
				backgroundColor,
				customBackgroundColor,
				customTextColor,
				textColor,
				contentAlign,
				focalPoint,
				hasParallax,
				videoMuted,
				videoLoop,
			} = attributes;

			

			return null;
	},
};

export { name, title, icon, settings };