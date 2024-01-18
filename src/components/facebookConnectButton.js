import { Button } from '@wordpress/components';
import apiFetch from '@wordpress/api-fetch';
import React, { useEffect, useState } from 'react';
import { getFacebookUserProfileDetails, getToken } from '../utils/helper';
import constants from '../utils/constants';
import { __ } from '@wordpress/i18n';
import classNames from 'classnames';

const FacebookConnectButton = ( { className, children, showData, onConnect, onDisconnect } ) => {
	const [ fieldValue, setFieldValue ] = useState( '' );
	const [ facebookAccess, setFacebookToken ] = useState( null );
	const [ profileData, setProfileData ] = useState( [] );

	const postToken = ( fb_token ) => {
		apiFetch( {
			url: constants.wordpress.fb_token,
			method: 'post',
			data: {
				fb_token,
			},
		} ).then( ( res ) => {
			return res;
		} ).catch( ( err ) => {
			console.error( err );
		} );
	};

	const hiiveToken = () => apiFetch( { url: constants.wordpress.access } ).then( ( res ) => {
		getToken().then( ( resp ) => {
			if ( resp.token ) {
				postToken( resp.token );
				setFacebookToken( resp.token );
			}
		} ).catch( ( err ) => {
			console.error( err );
		} );
		setFieldValue( res.token );
	} ).catch( ( err ) => {
		console.error( err );
	} );

    const getFbData = () => {
        apiFetch( { url: constants.wordpress.fb_token } ).then( ( res ) => {
			if ( res.fb_token ) {
				getFacebookUserProfileDetails().then( ( response ) => {
					setFacebookToken( res.fb_token );
					setProfileData( [ response ] );
                    if ( typeof onConnect === 'function' ) {
                        onConnect()
                    }
				} ).catch( () => hiiveToken() );
			} else {
				hiiveToken();
			}
		} );
    }
	useEffect( () => {
		apiFetch( { url: constants.wordpress.access } ).then( ( res ) => {
			res.token && setFieldValue( res.token );
		} );
		getFbData();
	}, [] );

	const connectFacebook = () => {
		const win = window.open( `${ constants.cf_worker.login_screen }?token_hiive=${ fieldValue }&redirect=${ window.location.href }`, 'ModalPopUp', `toolbar=no,scrollbars=no,location=no,width=${ window.innerWidth / 2 + 200 },height=${ window.innerHeight / 2 + 200 },top=200,left=200` );

		const intervalId = setInterval( function() {
			if ( win.closed ) {
				clearInterval( intervalId );
				getFbData();
			}
		}, 5000 );
	};

	return (
		<div>{
			facebookAccess
				?
                <div>
                    					<Button className={ classNames( 'nfd-facebook-button--connected', `${className}--connected` ) }>{ __('Connected', 'wp-module-facebook') }</Button>
                   { showData &&  <div>
						{ profileData?.map( ( dataObj ) => {
							return (
								<>
									<ul style={ { paddingTop: '20px' } }>
										<li><p>Facebook ID: { dataObj?.Users?.profile?.id }</p></li>
										<li><p>User Name: { dataObj?.Users?.profile?.name }</p></li>
										<li><p>User Email: { dataObj?.Users?.profile?.email }</p></li>
										<li><p>Profile pic:{ dataObj?.Users?.profile?.picture?.data?.url }</p></li>
									</ul>
									<img src={ `https://graph.facebook.com/${ dataObj?.id }/picture?type=small` } height={ dataObj?.picture?.height } width={ dataObj?.picture?.width } />
								</>
							);
						} ) }
					</div> }
                </div>
				: <Button type="submit" className={ classNames( 'nfd-facebook-button--connect', `${className}--connect` ) } onClick={ () => connectFacebook() }>
                    {children}{__('Connect Facebook', 'wp-module-facebook')}
               </Button>
		}
		</div> );
};

export default FacebookConnectButton;
