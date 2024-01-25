import { Button, Spinner } from '@wordpress/components';
import apiFetch from '@wordpress/api-fetch';
import React, { useEffect, useState } from 'react';
import { getFacebookUserProfileDetails } from '../utils/helper';
import constants from '../utils/constants';
import { __ } from '@wordpress/i18n';
import classNames from 'classnames';

const FacebookConnectButton = ({
  className,
  children,
  showData,
  onConnect,
  onDisconnect,
  onFailure,
  onClick
}) => {
  const [fieldValue, setFieldValue] = useState('');
  const [facebookAccess, setFacebookToken] = useState(false);
  const [profileData, setProfileData] = useState([]);
  const [loader, setLoader] = useState(false);
  let counter = 0;

  const hiiveToken = () =>
    apiFetch({ url: constants.wordpress.access })
      .then((res) => {
        getFacebookUserProfileDetails()
          .then((response) => {
            if (response !== 'token not found!') {
              setFacebookToken(true);
              setProfileData(response);
              setLoader(false);
              if (typeof onConnect === 'function') {
                onConnect(response);
              }
            }
            setLoader(false);
          })
          .catch((err) => {
            setLoader(false);
            if (typeof onFailure === 'function') {
              onFailure(err);
            }
            console.error(err);
          });
        setFieldValue(res.token);
      })
      .catch((err) => {
        setLoader(false);
        if (typeof onFailure === 'function') {
          onFailure(err);
        }
        console.error(err);
      });

  const getProfileData = () => {
    getFacebookUserProfileDetails()
      .then((response) => {
        counter++;
        if (response !== 'token not found!') {
          setFacebookToken(true);
          setProfileData(response);
          setLoader(false);
          if (typeof onConnect === 'function') {
            onConnect(response);
          }
        } else {
          if (counter < 2) {
            setTimeout(() => {
              getProfileData();
              setLoader(true);
            }, 6000);
          } else {
            setLoader(false);
          }
        }
      })
      .catch(() => hiiveToken());
  };
  const getFbData = () => {
    getProfileData();
  };

  useEffect(() => {
    !fieldValue &&
      apiFetch({ url: constants.wordpress.access }).then((res) => {
        res.token && setFieldValue(res.token);
      });
    getFbData();
  }, []);

  const connectFacebook = () => {
    const win = window.open(
      `${constants.cf_worker.login_screen}?token_hiive=${fieldValue}&redirect=${window.location.href}`,
      'ModalPopUp',
      `toolbar=no,scrollbars=no,location=no,width=${window.innerWidth / 2 + 200
      },height=${window.innerHeight / 2 + 200},top=200,left=200`
    );

    win.onunload = () => {
      setLoader(true);
          setTimeout(() => {
            getFbData();
          }, 20000);
      };

    if (typeof onClick === 'function') {
      onClick();
    }

  };

  return (
    <div>
      {facebookAccess ? (
        <div>
          <Button
            className={classNames(
              'nfd-facebook-button--connected',
              `${className}--connected`
            )}
          >
            {__('Connected', 'wp-module-facebook')}
          </Button>
          {showData && (
            <div>
              {profileData?.map((dataObj) => {
                return (
                  <>
                    <ul style={{ paddingTop: '20px' }}>
                      <li>
                        <p>Facebook ID: {dataObj?.User?.profile?.id}</p>
                      </li>
                      <li>
                        <p>User Name: {dataObj?.User?.profile?.name}</p>
                      </li>
                      <li>
                        <p>User Email: {dataObj?.User?.profile?.email}</p>
                      </li>
                      <li>
                        <p>
                          Profile pic:
                          {dataObj?.User?.profile?.picture?.data?.url}
                        </p>
                      </li>
                    </ul>
                    <img
                      src={`https://graph.facebook.com/${dataObj?.id}/picture?type=small`}
                      height={dataObj?.picture?.height}
                      width={dataObj?.picture?.width}
                    />
                  </>
                );
              })}
            </div>
          )}
        </div>
      ) : (
        <Button
          type="submit"
          disabled={loader}
          className={classNames(
            'nfd-facebook-button--connect',
            `${className}--connect`
          )}
          onClick={() => connectFacebook()}
        >
          {children}
          {__('Connect Facebook', 'wp-module-facebook')}
          {loader && <Spinner />}
        </Button>
      )}
    </div>
  );
};

export default FacebookConnectButton;
