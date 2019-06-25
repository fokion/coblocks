/**
 * Internal dependencies
 */
import { title } from './'
import ResponsiveTabsControl from '../../components/responsive-tabs-control';
import linkOptions from '../../components/block-gallery/options/link-options';
import SizeControl from '../../components/size-control';
import { BackgroundPanel } from '../../components/background';

/**
 * WordPress dependencies
 */
const { __, sprintf } = wp.i18n;
const { Component } = wp.element;
const { compose } = wp.compose;
const { withSelect } = wp.data;
const { InspectorControls, FontSizePicker, withFontSizes, PanelColorSettings } = wp.blockEditor;
const { PanelBody, RangeControl, ToggleControl, SelectControl } = wp.components;

/**
 * Inspector controls
 */
class Inspector extends Component {

	constructor( props ) {
		super( ...arguments );

		this.setLinkTo = this.setLinkTo.bind( this );
		this.setRadiusTo = this.setRadiusTo.bind( this );
		this.setFullwidthTo = this.setFullwidthTo.bind( this );
		this.setShadowTo = this.setShadowTo.bind( this );
		this.getColors = this.getColors.bind( this );
	}

	setLinkTo( value ) {
		this.props.setAttributes( { linkTo: value } );
	}

	setRadiusTo( value ) {
		this.props.setAttributes( { radius: value } );
	}

	setShadowTo( value ) {
		this.props.setAttributes( { shadow: value } );
	}

	setFullwidthTo() {
		this.props.setAttributes( { fullwidth: ! this.props.attributes.fullwidth, shadow: 'none' } );
	}

	getFullwidthImagesHelp( checked ) {
		return checked ? __( 'Fullwidth images are enabled.' ) : __( 'Toggle to fill the available gallery area with completely fullwidth images.' );
	}

	getCaptionsHelp( checked ) {
		return checked ? __( 'Showing captions for each media item.' ) : __( 'Toggle to show media captions.' );
	}

	getColors() {

		const {
			attributes,
			backgroundColor,
			captionColor,
			setBackgroundColor,
			setCaptionColor,
		} = this.props;

		const {
			backgroundImg,
			backgroundPadding,
			backgroundPaddingMobile,
			captions,
		} = attributes;

		const background = [
			{
				value: backgroundColor.color,
				onChange: ( nextBackgroundColor ) => {

					setBackgroundColor( nextBackgroundColor );

					// Add default padding, if they are not yet present.
					if ( ! backgroundPadding && ! backgroundPaddingMobile  ) {
						this.props.setAttributes( {
							backgroundPadding: 30,
							backgroundPaddingMobile: 30,
						} );
					}

					// Reset when cleared.
					if ( ! nextBackgroundColor && ! backgroundImg ) {
						this.props.setAttributes( {
							backgroundPadding: 0,
							backgroundPaddingMobile: 0,
						} );
					}
				},
				label: __( 'Background Color' ),
			},
		];

		const caption = [
			{
				value: captionColor.color,
				onChange: setCaptionColor,
				label: __( 'Caption Color' ),
			},
		];

		if ( captions ) {
			return background.concat( caption );
		} else {
			return background;
		}
	}

	render() {

		const {
			attributes,
			setAttributes,
			isSelected,
			setFontSize,
			fontSize,
			wideControlsEnabled = false,
		} = this.props;

		const {
			align,
			images,
			linkTo,
			gutter,
			lightbox,
			fullwidth,
			radius,
			shadow,
			captions,
			backgroundPadding,
		} = attributes;

		return (
			<InspectorControls>
				<PanelBody title={ sprintf( __( '%s Settings' ), title ) }>
					<ToggleControl
						label={ __( 'Captions' ) }
						checked={ !! captions }
						onChange={ () => setAttributes( {  captions: ! captions } ) }
						help={ this.getCaptionsHelp }
					/>
					{ captions &&
						<FontSizePicker
							value={ fontSize.size }
							onChange={ setFontSize }
						/>
					}
				</PanelBody>
				{ ! lightbox && <PanelBody
					title={ __( 'Link Settings' ) }
					initialOpen={ false }
					>
					<SelectControl
						label={ __( 'Link To' ) }
						value={ linkTo }
						options={ linkOptions }
						onChange={ this.setLinkTo }
					/>
				</PanelBody> }
				<BackgroundPanel { ...this.props }
 					hasCaption={ true }
 					hasOverlay={ true }
 					hasGalleryControls={ true }
 				/>
 				<PanelColorSettings
					title={ __( 'Color Settings' ) }
					initialOpen={ false }
					colorSettings={ this.getColors() }
				/>
			</InspectorControls>
		)
	}
};

export default compose( [
	withSelect( ( select ) => ( {
		wideControlsEnabled: select( 'core/editor' ).getEditorSettings().alignWide,
	} ) ),
	withFontSizes( 'fontSize' ),
] )( Inspector );
